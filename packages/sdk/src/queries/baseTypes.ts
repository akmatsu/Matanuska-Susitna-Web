export type ExternalLink = {
  id: string;
  label?: string | null;
  url: SavedUrl;
};

export type SavedUrl = {
  id: string;
  url: string;
  title: string;
};

export type Contact = {
  id: string;
  name: string;
  title?: string | null;
  phone?: string | null;
  email?: string | null;
};

export type PageListItem = {
  slug: string;
  id: string;
  title: string;
  description?: string | null;
};

export type Service = {
  slug: string;
  id: string;
  title: string;
  description?: string | null;
};

export type Address = {
  title: string;
  lineOne: string;
  lineTwo?: string | null;
  city: string;
  state: string;
  zip: string;
};

export type Hour = {
  day: string;
  open: string;
  close: string;
};

export type WhereSlugVariables = {
  where: {
    slug: string;
  };
};

export type Highlight = {
  id: string;
  image: string | null;
  title: string;
  linkedItem: {
    label: string;
    item?: {
      id: string;
      title: string;
      slug?: string;
      description?: string | null;
      url?: string;
    };
  };
};
