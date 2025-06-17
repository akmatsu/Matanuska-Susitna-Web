import { gql } from '@apollo/client';

export const ExternalActionFields = gql`
  fragment ExternalActionFields on ExternalLink {
    id
    label
    url {
      id
      title
      url
    }
  }
`;

export const ContactFields = gql`
  fragment ContactFields on Contact {
    id
    name
    phone
    email
    title
  }
`;

export const AddressFields = gql`
  fragment AddressFields on Location {
    title
    lineOne
    lineTwo
    city
    state
    zip
  }
`;

export const HourFields = gql`
  fragment HourFields on OperatingHour {
    day
    open
    close
  }
`;

export const ImageFields = gql`
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
`;

export const DocumentFields = gql`
  fragment DocumentFields on Document {
    id
    title
    file {
      filename
      url
      filesize
    }
  }
`;

export const UrlFields = gql`
  fragment UrlFields on Url {
    id
    title
    description
    url
  }
`;

export const ServiceFields = gql`
  fragment ServiceFields on Service {
    id
    title
    slug
    description
  }
`;

export const OrgUnitFields = gql`
  fragment OrgUnitFields on OrgUnit {
    id
    description
    title
    slug
  }
`;

export const TopicFields = gql`
  fragment TopicFields on Topic {
    id
    title
    slug
    description
  }
`;

export const TrailFields = gql`
  fragment TrailFields on Trail {
    id
    title
    description
    slug
  }
`;

export const FacilityFields = gql`
  fragment FacilityFields on Facility {
    id
    title
    description
    slug
  }
`;

export const PublicNoticeFields = gql`
  fragment PublicNoticeFields on PublicNotice {
    id
    title
    description
    slug
    heroImage
    urgency
  }
`;

export const ParkFields = gql`
  fragment ParkFields on Park {
    id
    title
    slug
    description
  }
`;

export const CommunityFields = gql`
  fragment CommunityFields on Community {
    id
    title
    slug
    description
  }
`;

export const AssemblyDistrictFields = gql`
  fragment AssemblyDistrictFields on AssemblyDistrict {
    id
    title
    slug
    description
  }
`;

export const BoardFields = gql`
  fragment BoardFields on Board {
    id
    title
    slug
    description
  }
`;

export const DistrictDetailFields = gql`
  ${ImageFields}

  fragment DistrictDetailFields on AssemblyDistrict {
    id
    title
    slug
    description
    memberName
    photo {
      ...ImageFields
    }
  }
`;

export const ActionFields = gql`
  ${ServiceFields}
  ${ParkFields}
  ${TrailFields}
  ${FacilityFields}
  ${CommunityFields}
  ${AssemblyDistrictFields}
  ${OrgUnitFields}
  ${UrlFields}

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
`;

export const GetInternalLinkDataFields = gql`
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
`;

export const HighlightFields = gql`
  ${ActionFields}
  fragment HighlightFields on Highlight {
    id
    image
    title

    linkedItem {
      ...ActionFields
    }
  }
`;
