// Separate lanes let each shard reach the Spark without crossing another thread.
export function shardThreadPoints(node, center) {
  const start = [center.x, center.y]
  const end = [node.x, node.y - 44 * (node.scale || 1)]
  const approach = [node.x, end[1] - 32]
  const tan15 = Math.tan(Math.PI / 12)
  const tan30 = Math.tan(Math.PI / 6)
  const tan60 = Math.sqrt(3)

  switch (node.id) {
    case 'daskar': {
      const lane = center.x - 40
      return [start, [lane, center.y + 40 * tan60], [lane, approach[1] - 40], approach, end]
    }
    case 'azar': {
      const lane = node.x + 60
      return [start, [lane, center.y + (lane - center.x) * tan60], [lane, approach[1] - 60], approach, end]
    }
    case 'ish-kashim': {
      const lane = node.x - 30
      return [start, [lane, center.y + center.x - lane], [lane, approach[1] - 30 * tan15], approach, end]
    }
    case 'var-elor': {
      const lane = center.x + 220
      return [start, [lane, center.y + 220], [lane, approach[1] - (lane - node.x) * tan30], approach, end]
    }
    default:
      return [start, end]
  }
}

export function threadPath(points) {
  return points.map(([x, y], index) => `${index ? 'L' : 'M'}${Number(x.toFixed(3))} ${Number(y.toFixed(3))}`).join(' ')
}
