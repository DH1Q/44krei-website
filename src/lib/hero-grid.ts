export interface GridConfig {
  width: number;
  height: number;
  columns: number;
  rows: number;
}

export interface GridModel {
  columns: number;
  rows: number;
  nodeCount: number;
  spacingX: number;
  spacingY: number;
  posX: Float32Array;
  posY: Float32Array;
  velX: Float32Array;
  velY: Float32Array;
  restX: Float32Array;
  restY: Float32Array;
}

export interface PointerImpulseOptions {
  pointerX: number;
  pointerY: number;
  strength: number;
  radiusMultiplier: number;
}

export function getNodeIndex(
  column: number,
  row: number,
  columns: number,
): number {
  return row * columns + column;
}

export function createGridModel(config: GridConfig): GridModel {
  const { width, height, columns, rows } = config;
  const nodeCount = columns * rows;
  const spacingX = width / Math.max(1, columns - 1);
  const spacingY = height / Math.max(1, rows - 1);
  const posX = new Float32Array(nodeCount);
  const posY = new Float32Array(nodeCount);
  const velX = new Float32Array(nodeCount);
  const velY = new Float32Array(nodeCount);
  const restX = new Float32Array(nodeCount);
  const restY = new Float32Array(nodeCount);

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = getNodeIndex(column, row, columns);
      const x = column * spacingX;
      const y = row * spacingY;
      posX[index] = x;
      posY[index] = y;
      restX[index] = x;
      restY[index] = y;
    }
  }

  return {
    columns,
    rows,
    nodeCount,
    spacingX,
    spacingY,
    posX,
    posY,
    velX,
    velY,
    restX,
    restY,
  };
}

export function applyPointerImpulse(
  grid: GridModel,
  options: PointerImpulseOptions,
): void {
  const { pointerX, pointerY, strength, radiusMultiplier } = options;
  const maxRadius =
    Math.max(grid.spacingX, grid.spacingY) * radiusMultiplier;

  for (let row = 0; row < grid.rows; row += 1) {
    for (let column = 0; column < grid.columns; column += 1) {
      const index = getNodeIndex(column, row, grid.columns);
      const dx = grid.restX[index] - pointerX;
      const dy = grid.restY[index] - pointerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance >= maxRadius || distance <= 0.1) continue;

      const falloff = Math.pow(1 - distance / maxRadius, 2);
      grid.velX[index] += (dx / distance) * strength * falloff;
      grid.velY[index] += (dy / distance) * strength * falloff;
    }
  }
}
