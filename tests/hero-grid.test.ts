import { describe, expect, it } from "vitest";
import {
  applyPointerImpulse,
  createGridModel,
  getNodeIndex,
} from "../src/lib/hero-grid";

describe("hero-grid", () => {
  it("creates a stable node matrix", () => {
    const grid = createGridModel({
      width: 300,
      height: 180,
      columns: 6,
      rows: 4,
    });

    expect(grid.nodeCount).toBe(24);
    expect(grid.posX.length).toBe(24);
    expect(grid.posY.length).toBe(24);
    expect(grid.restX[getNodeIndex(2, 1, 6)]).toBeGreaterThan(0);
  });

  it("applies stronger impulse to nearby nodes than distant ones", () => {
    const grid = createGridModel({
      width: 320,
      height: 200,
      columns: 8,
      rows: 5,
    });
    const nearIndex = getNodeIndex(3, 2, 8);
    const farIndex = getNodeIndex(0, 0, 8);
    const pointerX = grid.restX[nearIndex] + 6;
    const pointerY = grid.restY[nearIndex] + 4;

    applyPointerImpulse(grid, {
      pointerX,
      pointerY,
      strength: 16,
      radiusMultiplier: 2.8,
    });

    const nearVelocity =
      Math.abs(grid.velX[nearIndex]) + Math.abs(grid.velY[nearIndex]);
    const farVelocity =
      Math.abs(grid.velX[farIndex]) + Math.abs(grid.velY[farIndex]);

    expect(nearVelocity).toBeGreaterThan(0);
    expect(farVelocity).toBeLessThan(nearVelocity);
  });
});
