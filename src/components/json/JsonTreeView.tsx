"use client";

import { useState } from "react";
import { ChevronRight, ChevronsRight, Braces, Brackets, FileJson, Minus, Plus, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

interface JsonTreeViewProps {
  data: JsonValue;
  isRoot?: boolean;
}

const getDataType = (data: JsonValue) => {
  if (data === null) return "null";
  if (Array.isArray(data)) return "array";
  return typeof data;
};

const getIcon = (type: ReturnType<typeof getDataType>) => {
    switch(type) {
        case "object": return <Braces className="h-4 w-4 text-amber-500" />;
        case "array": return <Brackets className="h-4 w-4 text-fuchsia-500" />;
        default: return <FileJson className="h-4 w-4 text-sky-500" />;
    }
}

const ValueDisplay = ({ value }: { value: JsonValue }) => {
  const type = getDataType(value);
  switch (type) {
    case "string":
      return <span className="text-green-400">"{value}"</span>;
    case "number":
      return <span className="text-blue-400">{value}</span>;
    case "boolean":
      return <span className="text-purple-400">{String(value)}</span>;
    case "null":
      return <span className="text-gray-500">null</span>;
    default:
      return null;
  }
};

const JsonNode = ({
  nodeKey,
  nodeValue,
  level = 0,
}: {
  nodeKey: string;
  nodeValue: JsonValue;
  level?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 1);
  const type = getDataType(nodeValue);
  const isObjectOrArray = type === "object" || type === "array";
  const items = isObjectOrArray ? Object.entries(nodeValue as object) : [];
  const itemCount = items.length;

  const toggleExpand = () => {
    if (isObjectOrArray) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={cn("font-code text-sm", `pl-${level * 4}`)}>
      <div
        className={cn(
          "flex items-center space-x-1 py-1 rounded",
          isObjectOrArray && "cursor-pointer hover:bg-muted/50"
        )}
        onClick={toggleExpand}
      >
        <span style={{ paddingLeft: `${level * 1.25}rem` }} className="flex items-center">
            {isObjectOrArray ? (
                <ChevronRight
                    className={cn(
                        "h-4 w-4 mr-1 shrink-0 transition-transform duration-200",
                        isExpanded && "rotate-90"
                    )}
                />
            ) : (
                <GripVertical className="h-4 w-4 mr-1 invisible" /> 
            )}
            <span className="mr-1">{getIcon(type)}</span>
            <span className="text-primary/80">{nodeKey}:</span>
        </span>
        {!isObjectOrArray && (
          <span className="ml-2">
            <ValueDisplay value={nodeValue} />
          </span>
        )}
        {isObjectOrArray && (
          <span className="ml-2 text-muted-foreground text-xs">
            {isExpanded ? '' : type === 'array' ? `[${itemCount} items]` : `{${itemCount} keys}` }
          </span>
        )}
      </div>

      {isExpanded && isObjectOrArray && (
        <div className="border-l border-primary/10">
          {items.map(([key, value]) => (
            <JsonNode key={key} nodeKey={key} nodeValue={value} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};


export function JsonTreeView({ data, isRoot = true }: JsonTreeViewProps) {
  if (typeof data !== "object" || data === null) {
    return (
      <div className="p-4 bg-muted rounded-md">
        <ValueDisplay value={data} />
      </div>
    );
  }

  return (
    <div className="p-4 bg-background rounded-md">
        {Object.entries(data).map(([key, value]) => (
            <JsonNode key={key} nodeKey={key} nodeValue={value} level={0} />
        ))}
    </div>
  );
}
