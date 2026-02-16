import { lazy, Suspense } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const fallbackIcon = "circle-alert";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
  fallback?: string;
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function Icon({ name, fallback, ...props }: IconProps) {
  const kebab = toKebabCase(name);
  const iconName = (
    kebab in dynamicIconImports ? kebab : fallback ? toKebabCase(fallback) : fallbackIcon
  ) as keyof typeof dynamicIconImports;

  const LucideIcon = lazy(dynamicIconImports[iconName]);

  return (
    <Suspense fallback={<div style={{ width: props.size || 24, height: props.size || 24 }} />}>
      <LucideIcon {...props} />
    </Suspense>
  );
}

export default Icon;
