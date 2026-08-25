import { describe, expect, it } from "vitest";

import { buildMugMesh } from "./ProductSpin";

describe("buildMugMesh", () => {
  it("builds a finite, low-poly mug in the target triangle range", () => {
    const mesh = buildMugMesh(48);
    const triangleCount = mesh.triangles.length / 3;

    expect(triangleCount).toBeGreaterThanOrEqual(1_200);
    expect(triangleCount).toBeLessThanOrEqual(2_500);
    expect(mesh.surfaces).toHaveLength(triangleCount);
    expect(Array.from(mesh.vertices).every(Number.isFinite)).toBe(true);
  });
});
