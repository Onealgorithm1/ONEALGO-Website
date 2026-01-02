const fs = require("fs");
const path = require("path");

console.log("🚀 OneAlgorithm Performance Audit\n");

// Check bundle sizes
const distPath = "dist/spa/assets";
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  const jsFiles = files.filter((f) => f.endsWith(".js"));
  const cssFiles = files.filter((f) => f.endsWith(".css"));

  console.log("📦 Bundle Analysis:");
  jsFiles.forEach((file) => {
    const stats = fs.statSync(path.join(distPath, file));
    const sizeKB = (stats.size / 1024).toFixed(2);
    const status = stats.size > 500000 ? "❌ TOO LARGE" : "✅ OK";
    console.log(`  ${file}: ${sizeKB} KB ${status}`);
  });

  cssFiles.forEach((file) => {
    const stats = fs.statSync(path.join(distPath, file));
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`  ${file}: ${sizeKB} KB`);
  });
} else {
  console.log('❌ Build files not found. Run "npm run build" first.');
}

// Check for unused dependencies
console.log("\n🔍 Dependency Analysis:");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const suspiciousDeps = [
  "@react-three/drei",
  "@react-three/fiber",
  "three",
  "@types/three",
  "embla-carousel-react",
  "next-themes",
];

suspiciousDeps.forEach((dep) => {
  if (packageJson.devDependencies?.[dep] || packageJson.dependencies?.[dep]) {
    console.log(`⚠️  Found potentially unused: ${dep}`);
  }
});

// Performance recommendations
console.log("\n🎯 Performance Recommendations:");
console.log("1. Remove unused Three.js dependencies (-180KB)");
console.log("2. Implement code splitting with manual chunks");
console.log("3. Add lazy loading for route components");
console.log("4. Optimize images (convert to WebP)");
console.log("5. Implement service worker for caching");
console.log("6. Consider removing unused Radix UI components");

console.log("\n📈 Next Steps:");
console.log("- Run: bash scripts/remove-unused-deps.sh");
console.log("- Replace vite.config.ts with vite.config.optimized.ts");
console.log("- Test performance with: npm run build");
