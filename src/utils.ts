import "colors";

export function info(message?: string) {
  console.log(`[ ${"INFO".cyan} ] ${message}`);
}

export function warn(message?: string) {
  console.log(`[ ${"WARN".cyan} ] ${message}`);
}

export function error(message?: string) {
  console.log(`[ ${"ERROR".cyan} ] ${message}`);
}

export function success(message?: string) {
  console.log(`[ ${"SUCCESS".cyan} ] ${message}`);
}
