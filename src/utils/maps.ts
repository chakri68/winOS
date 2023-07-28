export interface MappingStrategy {
  map(value: number): number;
}

// Linear mapping strategy
export class LinearMappingStrategy implements MappingStrategy {
  constructor(
    private a: number,
    private b: number,
    private x: number,
    private y: number
  ) {}

  map(value: number): number {
    value = Math.max(this.a, Math.min(this.b, value));
    const normalizedValue = (value - this.a) / (this.b - this.a);
    return this.x + normalizedValue * (this.y - this.x);
  }
}

// Exponential mapping strategy
export class ExponentialMappingStrategy implements MappingStrategy {
  constructor(
    private a: number,
    private b: number,
    private x: number,
    private y: number,
    private exponent: number
  ) {}

  map(value: number): number {
    value = Math.max(this.a, Math.min(this.b, value));
    const normalizedValue = (value - this.a) / (this.b - this.a);
    const mappedValue = Math.pow(normalizedValue, this.exponent);
    return this.x + mappedValue * (this.y - this.x);
  }
}

export function mapValue(value: number, strategy: MappingStrategy): number {
  return strategy.map(value);
}

// Example usage

// Linear mapping strategy
// const linearStrategy = new LinearMappingStrategy(0, 100, 10, 50);
// const mappedLinearValue = mapValue(75, linearStrategy);
// console.log(mappedLinearValue); // Output will be around 35 (depending on the input value)

// Exponential mapping strategy
// const exponentialStrategy = new ExponentialMappingStrategy(0, 100, 10, 50, 2);
// const mappedExponentialValue = mapValue(75, exponentialStrategy);
// console.log(mappedExponentialValue); // Output will be around 23 (depending on the input value)
