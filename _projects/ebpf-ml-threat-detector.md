---
title: "eBPF ML Threat Detector"
order: 1
featured: true
flag: "Personal / internship project, ongoing"
github: "https://github.com/AyebFarah/ebpf-ml-threat-detector"
tags: [eBPF, Tetragon, SQLAlchemy, Python, "Machine Learning", "MITRE ATT&CK"]
excerpt: >-
  An end-to-end pipeline that watches a Linux host at the kernel level,
  correlates the resulting telemetry into per-connection records, and feeds
  a tiered detection system, from cheap statistical classifiers up to
  graph-based and contextual analysis of flagged events.
pipeline:
  - "Collectors (eBPF/Tetragon)"
  - "→ Normalizer"
  - "→ Correlator"
  - "→ SQLAlchemy repositories"
  - "→ SQLite"
highlights:
  - "Kernel-level collectors for process, DNS, TLS, TCP, HTTP, SSH, file, and privilege events via Tetragon."
  - "Deterministic deduplication and a composite-indexed schema built for fast time-windowed queries."
  - "An isolated two-VM attack lab emulating 8 MITRE ATT&CK techniques for labeled, ground-truth data."
---

An end-to-end pipeline that watches a Linux host at the kernel level, correlates the resulting telemetry into per-connection records, and feeds a tiered detection system, from cheap statistical classifiers up to graph-based and contextual analysis of flagged events.

The system is built around a clear separation of concerns: eBPF/Tetragon collectors capture raw kernel events, a normalizer and correlator turn them into unified per-connection records, and a SQLAlchemy-backed persistence layer stores everything for downstream feature extraction and model training.
