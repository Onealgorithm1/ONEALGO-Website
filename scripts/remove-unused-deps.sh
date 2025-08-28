#!/bin/bash
echo "Removing unused dependencies..."

# Remove Three.js related packages
npm uninstall @react-three/drei @react-three/fiber @types/three three

# Remove other potentially unused packages (check usage first)
echo "Check if these are used before removing:"
echo "- embla-carousel-react"
echo "- next-themes" 
echo "- vaul"
echo "- recharts"

echo "Dependencies removal script created. Run manually after review."
