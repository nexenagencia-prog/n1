from pathlib import Path

root = Path(__file__).resolve().parents[1]
tsx = (root/'src/components/dashboard/StructuredDashboard.tsx').read_text()
css = (root/'src/components/dashboard/StructuredDashboard.module.css').read_text()

assert "hero-office-clean.png" in css, "hero must use a clean photo without baked UI"
assert "hero-office.png" not in css, "old screenshot-based hero must not be referenced"
assert "avatar-profile.png" in tsx, "profile must use the corrected avatar asset"
assert "sidebarCollapsed" in tsx and "setSidebarCollapsed" in tsx, "sidebar needs real collapse state"
assert "sidebarToggle" in tsx, "sidebar needs a visible expand/collapse control"
assert ".activeNav{background:#fff;color:#111" in css, "active navigation styling must remain"
assert "width:46px;overflow:hidden" not in css, "active item must not clip its label"
assert "grid-template-columns:150px" not in css, "sidebar width must be controlled by expanded/collapsed state"
print('dashboard structure checks passed')
