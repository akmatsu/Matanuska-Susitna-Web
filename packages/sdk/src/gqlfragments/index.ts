import { gql } from '@apollo/client';

export const fragments = gql`
  fragment ExternalActionFields on ExternalLink {
    id
    label
    url {
      id
      title
      url
    }
  }

  fragment OrgUnitFields on OrgUnit {
    id
    description
    title
    slug
  }

  fragment ContactFields on Contact {
    id
    name
    phone
    email
    title
  }

  fragment ServiceFields on Service {
    id
    title
    slug
    description
  }

  fragment AddressFields on Location {
    title
    lineOne
    lineTwo
    city
    state
    zip
  }

  fragment HourFields on OperatingHour {
    day
    open
    close
  }

  fragment TrailFields on Trail {
    id
    title
    description
    slug
  }

  fragment FacilityFields on Facility {
    id
    title
    description
    slug
  }

  fragment ImageFields on Image {
    id
    title
    description
    file {
      id
      width
      height
      url
    }
  }

  fragment PublicNoticeFields on PublicNotice {
    id
    title
    description
    slug
    heroImage
    urgency
  }

  fragment DocumentFields on Document {
    id
    title
    file {
      filename
      url
      filesize
    }
  }

  fragment ParkFields on Park {
    id
    title
    slug
    description
  }

  fragment CommunityFields on Community {
    id
    title
    slug
    description
  }

  fragment AssemblyDistrictFields on AssemblyDistrict {
    id
    title
    slug
    description
  }

  fragment UrlFields on Url {
    id
    title
    description
    url
  }

  fragment DistrictDetailFields on AssemblyDistrict {
    id
    title
    slug
    description
    memberName
    photo {
      file {
        url
      }
    }
  }

  fragment ActionFields on InternalLink {
    id
    label
    item {
      __typename
      ... on Service {
        ...ServiceFields
      }
      ... on Park {
        ...ParkFields
      }
      ... on Trail {
        ...TrailFields
      }
      ... on Facility {
        ...FacilityFields
      }
      ... on Community {
        ...CommunityFields
      }
      ... on AssemblyDistrict {
        ...AssemblyDistrictFields
      }
      ... on OrgUnit {
        ...OrgUnitFields
      }
      ... on Url {
        ...UrlFields
      }
    }
  }

  fragment GetInternalLinkDataFields on InternalLinkSearch {
    __typename
    ... on AssemblyDistrict {
      title
      slug
    }
    ... on Board {
      title
      slug
    }
    ... on BoardPage {
      title
    }
    ... on Community {
      title
      slug
    }
    ... on Facility {
      title
      slug
    }
    ... on HomePage {
      title
    }
    ... on OrgUnit {
      title
      slug
    }
    ... on Park {
      title
      slug
    }
    ... on PublicNotice {
      title
      slug
    }
    ... on Service {
      title
      slug
    }
    ... on Trail {
      title
      slug
    }
    ... on Url {
      title
      url
    }
  }

  fragment HighlightFields on Highlight {
    id
    image
    title

    linkedItem {
      ...ActionFields
    }
  }
`;
