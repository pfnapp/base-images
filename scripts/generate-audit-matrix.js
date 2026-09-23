#!/usr/bin/env node

/**
 * scripts/generate-audit-matrix.js
 *
 * Dynamically generates clustered scan targets from matrix.json for nightly-cve-audit.yml.
 * Produces 10 logical clusters (languages + frameworks) instead of dozens of uncoordinated jobs,
 * keeping CI fast, organized, and perfectly synchronized with matrix.json.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const MATRIX_FILE = path.join(ROOT_DIR, 'matrix.json');

const matrix = JSON.parse(fs.readFileSync(MATRIX_FILE, 'utf8'));

const LANGUAGE_TAG_SUFFIX = {
  node:   (v) => `${v}-alpine`,
  php:    (v) => `${v}-alpine`,
  bun:    (v) => `${v}-alpine`,
  python: (v) => `${v}-slim`,
  go:     (v) => `${v}-alpine`,
  java:   (v) => `${v}-alpine`,
};

const DISPLAY_NAMES = {
  node:    'Node.js',
  php:     'PHP',
  python:  'Python',
  go:      'Go',
  java:    'Java',
  bun:     'Bun',
  laravel: 'Laravel',
  nextjs:  'Next.js',
  nestjs:  'NestJS',
  vite:    'Vite',
};

const clusters = [];

// 1. Language clusters
for (const [lang, spec] of Object.entries(matrix.runtimes)) {
  const versions = [
    ...(spec.active_lts || []),
    ...(spec.maintenance_lts || []),
    ...(spec.supported || []),
    ...(spec.legacy || [])
  ];

  const images = versions.map((v) => ({
    version: `${v}`,
    image_ref: `ghcr.io/pfnapp/base/languages/${lang}:${LANGUAGE_TAG_SUFFIX[lang](v)}`,
    target_image: `${lang}:${LANGUAGE_TAG_SUFFIX[lang](v)}`
  }));

  clusters.push({
    cluster_id: lang,
    cluster_name: `${DISPLAY_NAMES[lang] || lang} Base Images`,
    category: 'language',
    images
  });
}

// 2. Framework clusters
for (const [fw, spec] of Object.entries(matrix.frameworks)) {
  const images = [];
  if (fw === 'vite') {
    images.push({
      version: 'latest',
      image_ref: 'ghcr.io/pfnapp/base/frameworks/vite:latest',
      target_image: 'vite:latest'
    });
  } else {
    for (const entry of (spec.compatibility_matrix || [])) {
      for (const rv of (entry.compatible_runtimes || [])) {
        const tag = fw === 'laravel'
          ? `${entry.framework_major}-php${rv}-alpine`
          : `${entry.framework_major}-node${rv}-alpine`;
        images.push({
          version: `${entry.framework_major}-${spec.runtime}${rv}`,
          image_ref: `ghcr.io/pfnapp/base/frameworks/${fw}:${tag}`,
          target_image: `${fw}:${tag}`
        });
      }
    }
  }

  clusters.push({
    cluster_id: fw,
    cluster_name: `${DISPLAY_NAMES[fw] || fw} Framework Images`,
    category: 'framework',
    images
  });
}

const output = {
  include: clusters.map((c) => ({
    cluster_id: c.cluster_id,
    cluster_name: c.cluster_name,
    category: c.category,
    image_count: c.images.length,
    images_json: JSON.stringify(c.images)
  }))
};

process.stdout.write(JSON.stringify(output));
