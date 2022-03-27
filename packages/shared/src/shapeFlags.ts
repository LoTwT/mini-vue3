export const enum ShapeFlags {
  ELEMENT = 1, // 0b00000001
  STATEFUL_COMPONENT = 1 << 1, // 0b00000010
  TEXT_CHILDREN = 1 << 2, // 0b00000100
  ARRAY_CHILDREN = 1 << 3, // 0b00001000
}
