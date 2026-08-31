from pathlib import Path

root = Path(__file__).resolve().parents[1]
tsx = (root/'src/components/dashboard/StructuredDashboard.tsx').read_text()
css = (root/'src/components/dashboard/StructuredDashboard.module.css').read_text()
sidebar = (root/'src/components/app/Sidebar.tsx').read_text()
app_shell = (root/'src/components/app/AppShell.tsx').read_text()
profile = (root/'src/components/app/ProfileEditor.tsx').read_text()

assert "hero-photo.png" in css, "hero must use a clean photo asset only"
assert "hero-office-clean.png" not in css, "old hero with baked UI must not be referenced"
assert (root/'public/images/hero-photo.png').exists(), "clean hero photograph must exist"
assert "Sidebar" in tsx and "Sidebar" in app_shell, "home and internal pages must share the same sidebar component"
assert "setSidebarCollapsed" in tsx and "setSidebarCollapsed" in app_shell, "sidebar must expand/collapse on every route"
assert "220px 1fr" not in app_shell, "secondary pages must not use a separate shifted sidebar shell"
for label in ["Calculadora","Skills","OCTA Skills","Lousa","Anotar","Anotações"]:
    assert label in sidebar, f"missing sidebar item: {label}"
assert "profile.name.split" in tsx and "<b>{profile.name" in tsx, "greeting/profile name must be editable and bold"
assert "Trocar foto" in profile and "FileReader" in profile, "profile photo must be editable by the user"
for n in range(1,5):
    assert f"/images/recording-{n}.png" in tsx, f"recording thumbnail {n} must be used"
assert "src={avatars[avatarIndex]}" not in tsx.split("recordings.map",1)[1], "recordings must not reuse circular avatars as thumbnails"
assert ".heroCopy h1{font-size:45px" in css and "font-weight:610" in css, "hero title must use refined UI typography"
print('dashboard fidelity checks passed')

css = (root/'src/components/dashboard/StructuredDashboard.module.css').read_text()
assert "octa-ai-background.png" in css, "OCTA AI card must use the supplied futuristic landscape as its background"
assert ".aiCard:before" in css, "OCTA AI background needs a readability overlay"
assert ".heroImage:before" in css, "hero photo needs a subtle futuristic atmospheric treatment without replacing the man photo"
assert (root/'public/images/octa-ai-background.png').exists(), "OCTA AI background asset must be packaged locally"
