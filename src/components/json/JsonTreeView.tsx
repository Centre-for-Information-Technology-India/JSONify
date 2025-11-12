"use client";

import { useState, useMemo } from "react";
import { ChevronRight, Braces, Brackets, FileJson, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

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
};

const Highlight = ({ text, highlight }: { text: string; highlight: string }) => {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <span key={i} className="bg-primary/30 text-primary-foreground rounded">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </span>
    );
};

const ValueDisplay = ({ value, searchTerm }: { value: JsonValue, searchTerm: string }) => {
  const type = getDataType(value);
  switch (type) {
    case "string":
      return <span className="text-green-400">"<Highlight text={value as string} highlight={searchTerm} />"</span>;
    case "number":
      return <span className="text-blue-400"><Highlight text={String(value)} highlight={searchTerm} /></span>;
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
  searchTerm,
  isInitiallyExpanded,
}: {
  nodeKey: string;
  nodeValue: JsonValue;
  level?: number;
  searchTerm: string;
  isInitiallyExpanded: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
  const type = getDataType(nodeValue);
  const isObjectOrArray = type === "object" || type === "array";
  
  const filteredItems = useMemo(() => {
    if (!isObjectOrArray) return [];
    const items = Object.entries(nodeValue as object);
    if (!searchTerm.trim()) return items;
    
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return items.filter(([key, value]) => {
      const check = (k: string, v: JsonValue): boolean => {
        if (k.toLowerCase().includes(lowerCaseSearchTerm)) return true;
        
        const valueType = getDataType(v);
        if (valueType === 'string' || valueType === 'number') {
            if(String(v).toLowerCase().includes(lowerCaseSearchTerm)) return true;
        }

        if (valueType === 'object') {
            return Object.entries(v as object).some(([subKey, subValue]) => check(subKey, subValue));
        }
        if (valueType === 'array') {
            return (v as JsonValue[]).some((item, index) => check(String(index), item));
        }
        return false;
      };
      return check(key, value);
    });
  }, [nodeValue, searchTerm, isObjectOrArray]);

  const itemCount = filteredItems.length;

  const toggleExpand = () => {
    if (isObjectOrArray) {
      setIsExpanded(!isExpanded);
    }
  };

  if (searchTerm && !isObjectOrArray) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const keyMatch = nodeKey.toLowerCase().includes(lowerCaseSearchTerm);
    const valueMatch = (type === 'string' || type === 'number') && String(nodeValue).toLowerCase().includes(lowerCaseSearchTerm);
    if (!keyMatch && !valueMatch) {
      return null;
    }
  }

  if (searchTerm && isObjectOrArray && itemCount === 0) {
    return null;
  }

  return (
    <div className={cn("font-code text-sm")} role="treeitem" aria-expanded={isObjectOrArray ? isExpanded : undefined}>
      <div
        className={cn(
          "flex items-center space-x-1 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          isObjectOrArray && "cursor-pointer hover:bg-muted/50"
        )}
        onClick={toggleExpand}
        onKeyDown={(e) => {
          if (isObjectOrArray && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            toggleExpand();
          }
        }}
        style={{ paddingLeft: `${level * 1.25}rem` }}
        tabIndex={isObjectOrArray ? 0 : -1}
        role={isObjectOrArray ? "button" : undefined}
        aria-label={isObjectOrArray ? `${nodeKey}: ${type} with ${itemCount} ${type === 'array' ? 'items' : 'keys'}. ${isExpanded ? 'Expanded' : 'Collapsed'}. Press Enter or Space to ${isExpanded ? 'collapse' : 'expand'}` : `${nodeKey}: ${type} value`}
      >
        {isObjectOrArray ? (
            <ChevronRight
                className={cn(
                    "h-4 w-4 mr-1 shrink-0 transition-transform duration-200",
                    isExpanded && "rotate-90"
                )}
                aria-hidden="true"
            />
        ) : (
            <GripVertical className="h-4 w-4 mr-1 invisible" aria-hidden="true" /> 
        )}
        <span className="mr-1" aria-hidden="true">{getIcon(type)}</span>
        <span className="text-primary/80"><Highlight text={nodeKey} highlight={searchTerm} />:</span>
        
        {!isObjectOrArray && (
          <span className="ml-2">
            <ValueDisplay value={nodeValue} searchTerm={searchTerm} />
          </span>
        )}
        {isObjectOrArray && (
          <span className="ml-2 text-muted-foreground text-xs" aria-hidden="true">
            {isExpanded ? '' : type === 'array' ? `[${itemCount} items]` : `{${itemCount} keys}` }
          </span>
        )}
      </div>

      {isExpanded && isObjectOrArray && (
        <div className="border-l border-primary/10" role="group">
          {filteredItems.map(([key, value]) => (
            <JsonNode key={key} nodeKey={key} nodeValue={value} level={level + 1} searchTerm={searchTerm} isInitiallyExpanded={!!searchTerm} />
          ))}
        </div>
      )}
    </div>
  );
};


export function JsonTreeView({ data }: { data: JsonValue }) {
  const [searchTerm, setSearchTerm] = useState("");
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    if (typeof data !== "object" || data === null) return data;

    const filterRecursively = (currentData: JsonValue): JsonValue | null => {
        if (typeof currentData !== 'object' || currentData === null) {
            return String(currentData).toLowerCase().includes(lowerCaseSearchTerm) ? currentData : null;
        }

        if (Array.isArray(currentData)) {
            const newArray = currentData.map(item => filterRecursively(item)).filter(item => item !== null);
            return newArray.length > 0 ? newArray : null;
        }

        const newObj: { [key: string]: JsonValue } = {};
        let hasMatch = false;
        for (const key in currentData) {
            if (key.toLowerCase().includes(lowerCaseSearchTerm)) {
                newObj[key] = (currentData as any)[key];
                hasMatch = true;
            } else {
                const result = filterRecursively((currentData as any)[key]);
                if (result !== null) {
                    newObj[key] = result;
                    hasMatch = true;
                }
            }
        }
        return hasMatch ? newObj : null;
    };
    
    // This is not perfect, but it's a start. A better implementation would build a map of visible nodes.
    // For now we just return the full data if search term is active to allow child nodes to be searched.
    return data;

  }, [data, searchTerm, lowerCaseSearchTerm]);


  if (typeof filteredData !== "object" || filteredData === null) {
    return (
      <div className="p-4 bg-muted rounded-md">
        <ValueDisplay value={filteredData} searchTerm={searchTerm} />
      </div>
    );
  }

  return (
    <div className="p-4 bg-background rounded-md flex flex-col gap-4 h-full">
        <Input 
            placeholder="Search key or value..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            aria-label="Search JSON tree by key or value"
            type="search"
        />
        <div className="overflow-auto flex-grow scrollbar-thin" role="tree" aria-label="JSON tree structure">
            {Object.entries(filteredData).map(([key, value]) => (
                <JsonNode key={key} nodeKey={key} nodeValue={value} level={0} searchTerm={searchTerm} isInitiallyExpanded={!!searchTerm || searchTerm.length === 0} />
            ))}
        </div>
    </div>
  );
}
