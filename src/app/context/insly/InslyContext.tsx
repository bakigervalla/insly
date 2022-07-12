import { createContext } from "react";

interface InslyProps {
  intialized: boolean;
  instances: Array<any>;
  settings: any;
  schemas: any;
  fields: Array<any>;
  templates: any;
  documents: any;
  getInstances?: (symbols: Array<string>) => void;
  getTemplates?: (symbols: Array<string>) => void;
  getSchemas?: (symbols: Array<string>) => void;
}

const defaultValue: InslyProps = {
  intialized: false,
  instances: [],
  settings: {},
  schemas: {},
  fields: [],
  templates: {},
  documents: {},
};

const InslyContext = createContext(defaultValue);

export default InslyContext;
