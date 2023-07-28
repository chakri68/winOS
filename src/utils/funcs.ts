import clsx from "clsx";
import { LinearMappingStrategy, mapValue } from "./maps";

/**
 * Returns a class name object with the class names from the styles object.
 * @param styles - The styles object.
 * @param exportStyles - The styles object to export.
 * @returns - The class name object.
 */
export const getClassNames = (
  styles: {
    readonly [key: string]: string;
  },
  exportStyles: { readonly [key: string]: string | string[] }
) => {
  const classNames: { [c: string]: string } = {};
  for (const [key, value] of Object.entries(styles)) {
    if (key in exportStyles) {
      const exportStyleValue = exportStyles[key];
      if (typeof exportStyleValue === "string") {
        classNames[key] = clsx(value, exportStyleValue);
      } else if (Array.isArray(exportStyleValue)) {
        classNames[key] = clsx(value, ...exportStyleValue);
      } else {
        classNames[key] = value;
      }
    } else {
      classNames[key] = value;
    }
  }
  return classNames;
};

/**
 * Calculates the scaling factor for the given points.
 * @param valueY1 - The first value.
 * @param valueY2 - The second value.
 * @param maxScaling - Maximum scaling factor you want to apply (e.g., 2 for twice the original size).
 * @param a - A constant that controls how quickly the scaling varies with distance. Higher values make it scale faster, while lower values make it scale more gradually.
 * @param minScaling - Minimum scaling factor you want to apply (e.g., 0.5 for half the original size).
 */
export function getScalingFactor(
  valueY1: number,
  valueY2: number,
  maxDistance: number,
  maxScaling: number,
  minScaling = 1
) {
  // const linearStrategy = new LinearMappingStrategy(
  //   -maxDistance,
  //   0,
  //   minScaling,
  //   maxScaling
  // );

  const exponentialStrategy = new LinearMappingStrategy(
    -maxDistance,
    0,
    minScaling,
    maxScaling
  );

  const dx = -Math.abs(valueY1 - valueY2);

  // return mapValue(distance, linearStrategy);
  return mapValue(dx, exponentialStrategy);
}
