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

  fragment TopicFields on Topic {
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

  fragment BoardFields on Board {
    id
    title
    slug
    description
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

  fragment TopicPage on Topic {
    id
    body
    description
    slug
    heroImage
    publicNotices {
      ...PublicNoticeFields
    }
    actions {
      ...ActionFields
    }
    documents {
      ...DocumentFields
    }
    contacts {
      ...ContactFields
    }
    highlights {
      ...HighlightFields
    }
    boards {
      ...BoardFields
    }
    services {
      ...ServiceFields
    }
    communities {
      ...CommunityFields
    }
    facilities {
      ...FacilityFields
    }
    districts {
      ...DistrictDetailFields
    }
    orgUnits {
      ...OrgUnitFields
    }
    parks {
      ...ParkFields
    }
    trails {
      ...TrailFields
    }
  }

  fragment AssemblyDistrictPage on AssemblyDistrict {
    id
    heroImage
    title
    description
    slug
    body
    documents {
      ...DocumentFields
    }
    actions {
      ...ActionFields
    }
    topics {
      ...TopicFields
    }
    contacts {
      ...ContactFields
    }
    photo {
      ...ImageFields
    }
    memberName
    bio
    address {
      ...AddressFields
    }
    email
    phone
    fax
    termStart
    termEnd
  }

  fragment BoardPage on Board {
    id
    title
    slug
    description
    body
    heroImage
    meetingSchedule
    isActive
    communities {
      ...CommunityFields
    }
    districts {
      ...DistrictDetailFields
    }
    linkToAgendas {
      ...ExternalActionFields
    }
    linkToResolutions {
      ...ExternalActionFields
    }
    linkToPublicOpinionMessage {
      ...ExternalActionFields
    }
    contacts {
      ...ContactFields
    }
    actions {
      ...ActionFields
    }
    documents {
      ...DocumentFields
    }
  }

  fragment CommunityPage on Community {
    id
    title
    description
    body
    heroImage
    boards {
      ...BoardFields
    }
    topics {
      ...TopicFields
    }
    documents {
      ...DocumentFields
    }
    actions {
      ...ActionFields
    }
    services {
      ...ServiceFields
    }
    contacts {
      ...ContactFields
    }
    districts {
      ...DistrictDetailFields
    }
  }

  fragment FacilityPage on Facility {
    id
    slug
    title
    liveUrl
    heroImage
    description
    body
    actions {
      ...ActionFields
    }
    documents {
      ...DocumentFields
    }

    topics {
      ...TopicFields
    }
    park {
      ...ParkFields
    }
    services {
      ...ServiceFields
    }
    address {
      ...AddressFields
    }
    contacts {
      ...ContactFields
    }
    hours {
      ...HourFields
    }
  }

  fragment OrgUnitPage on OrgUnit {
    id
    title
    description
    body
    heroImage
    actions {
      ...ActionFields
    }
    documents {
      ...DocumentFields
    }
    topics {
      ...TopicFields
    }
    children {
      ...OrgUnitFields
    }
    contacts {
      ...ContactFields
    }
    parent {
      ...OrgUnitFields
    }
    services {
      ...ServiceFields
    }
  }

  fragment ParkPage on Park {
    id
    title
    slug
    body
    heroImage
    description
    actions {
      ...ActionFields
    }
    documents {
      ...DocumentFields
    }
    contacts {
      ...ContactFields
    }
    services {
      ...ServiceFields
    }
    address {
      ...AddressFields
    }
    hours {
      ...HourFields
    }
    trails {
      ...TrailFields
    }
    facilities {
      ...FacilityFields
    }
  }

  fragment PublicNoticePage on PublicNotice {
    id
    slug
    title
    heroImage
    body
    description
    effectiveDate
    endDate
    contacts {
      ...ContactFields
    }
    documents {
      ...DocumentFields
    }
    actions {
      ...ActionFields
    }

    contacts {
      ...ContactFields
    }
    topics {
      ...TopicFields
    }
    communities {
      ...CommunityFields
    }
    assemblyDistricts {
      ...AssemblyDistrictFields
    }
    parks {
      ...ParkFields
    }
    facilities {
      ...FacilityFields
    }
    trails {
      ...TrailFields
    }
    orgUnits {
      ...OrgUnitFields
    }
    boards {
      ...BoardFields
    }
    services {
      ...ServiceFields
    }
  }

  fragment ServicePage on Service {
    id
    slug
    title
    heroImage
    body
    description
    documents {
      ...DocumentFields
    }
    primaryAction {
      ...ExternalActionFields
    }
    secondaryActions {
      ...ExternalActionFields
    }
    primaryContact {
      ...ContactFields
    }
    contacts {
      ...ContactFields
    }
  }

  fragment TrailPage on Trail {
    id
    title
    body
    heroImage
    description
    length
    atv
    biking
    crossCountrySkiing
    difficulty
    dirtBiking
    dogWalking
    elevationChange
    fall
    frisbeeGolf
    hiking
    horsebackRiding
    mushing
    open
    running
    snowMachining
    snowshoeing
    spring
    summer
    winter

    topics {
      ...TopicFields
    }
    actions {
      ...ActionFields
    }
    documents {
      ...DocumentFields
    }
    park {
      ...ParkFields
    }
    contacts {
      ...ContactFields
    }
    address {
      ...AddressFields
    }
    services {
      ...ServiceFields
    }
  }
`;
