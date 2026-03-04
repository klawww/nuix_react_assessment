export interface ItemProperties {
  [key: string]: any;
}

export interface Item {
  guid: string;
  name: string;
  path: string[];
  properties: ItemProperties;
}

export interface ItemsState {
  items: Item[];
  selectedItem: Item | null;
  loading: boolean;
  error: string | null;
}
