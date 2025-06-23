/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetBoard($where: BoardWhereUniqueInput!) {\n    board(where: $where) {\n      body\n      description\n      title\n      ...HeroImage\n      meetingSchedule\n      isActive\n      communities {\n        ...PageList\n      }\n      districts {\n        ...DistrictDetailFields\n      }\n      linkToAgendas {\n        ...ExternalActionButton\n      }\n      linkToResolutions {\n        ...ExternalActionButton\n      }\n      linkToPublicOpinionMessage {\n        ...ExternalActionButton\n      }\n      contacts {\n        ...ContactFields\n      }\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n    }\n  }\n": typeof types.GetBoardDocument,
    "\n    query GetBoards($take: Int, $skip: Int, $where: BoardWhereInput) {\n    boards(take: $take, where: $where, skip: $skip) {\n      id\n      title\n      slug\n      description\n      isActive\n      type\n      meetingSchedule\n    }\n  }\n": typeof types.GetBoardsDocument,
    "\n  query GetBoardsPage {\n    boardPage {\n      ...PageBody\n      ...HeroImage\n      vacancyReport {\n        ...BoardDocumentLink\n      }\n      documents {\n        ...BoardDocumentList\n      }\n      applicationForm {\n        ...BoardDocumentLink\n      }\n\n      contacts {\n        ...ContactFields\n      }\n\n      actions {\n        ...ActionFields\n      }\n    }\n  }\n": typeof types.GetBoardsPageDocument,
    "\n  query GetCommunity(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    community(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      ...PageMap\n      boards {\n        ...PageList\n      }\n      topics {\n        ...TopicFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      services {\n        ...ServiceFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      districts {\n        ...DistrictDetailFields\n      }\n    }\n\n    publicNotices(\n      where: { communities: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": typeof types.GetCommunityDocument,
    "\n  query GetOrgUnit(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    orgUnit(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      topics {\n        ...TopicFields\n      }\n      children {\n        ...OrgUnitFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      parent {\n        ...OrgUnitFields\n      }\n      services {\n        ...ServiceFields\n      }\n    }\n    publicNotices(\n      where: { orgUnits: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n  ": typeof types.GetOrgUnitDocument,
    "\n    query GetAssemblyDistrict(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    assemblyDistrict(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody      \n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      topics {\n        ...TopicFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      \n      ...AssemblyMemberInfo\n      address {\n        ...AddressFields\n      }\n    }\n\n    publicNotices(\n      where: { assemblyDistricts: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": typeof types.GetAssemblyDistrictDocument,
    "\n  query GetFacility(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    facility(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n\n      topics {\n        ...PageList\n      }\n      park {\n        ...PageList\n      }\n      services {\n        ...ServiceFields\n      }\n      address {\n        ...AddressFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      hours {\n        ...HourFields\n      }\n    }\n\n    publicNotices(\n      where: { communities: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": typeof types.GetFacilityDocument,
    "\n  query GetHomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {\n    homePage {\n      id\n      title\n      description\n      heroImage\n      ...ToolbeltItems\n      ...HomePageHighlights\n    }\n\n    publicNotices(take: $take, orderBy: $orderBy) {\n      ...PublicNoticeList\n    }\n  }\n": typeof types.GetHomePageDocument,
    "\n  query GetPark(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    park(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      services {\n        ...ServiceFields\n      }\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourFields\n      }\n      trails {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n    }\n\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": typeof types.GetParkDocument,
    "\n  query GetPublicNotice($slug: String!) {\n    publicNotice(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody\n      contacts {\n        ...ContactFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      topics {\n        ...PageList\n      }\n      communities {\n        ...PageList\n      }\n      assemblyDistricts {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      orgUnits {\n        ...PageList\n      }\n      boards {\n        ...PageList\n      }\n      services {\n        ...ServiceFields\n      }\n    }\n  }\n": typeof types.GetPublicNoticeDocument,
    "\n  query GetService(\n    $slug: String!,\n    $take: Int = 5,\n    $orderDirection: OrderDirection = desc\n  ) {\n    service(where: { slug: $slug}) {\n      ...PageBody\n      ...HeroImage\n      documents {\n        ...DocumentList\n      }\n      primaryAction {\n        ...ExternalActionFields\n      }\n      secondaryActions {\n        ...ExternalActionFields\n      }\n      primaryContact {\n        ...ContactList\n      }\n      contacts {\n        ...ContactList\n      }\n    }\n\n    publicNotices(\n      where: { services: { some: { slug: { equals: $slug } } } }, \n      take: $take, \n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": typeof types.GetServiceDocument,
    "\n  fragment TrailPage on Trail {\n    id\n    title\n    body\n    heroImage\n    description\n    ...TrailInfo\n    topics {\n      ...TopicFields\n    }\n    actions {\n      ...ActionFields\n    }\n    documents {\n      ...DocumentFields\n    }\n    park {\n      ...PageList\n    }\n    contacts {\n      ...ContactFields\n    }\n    address {\n      ...AddressFields\n    }\n    services {\n      ...ServiceFields\n    }\n  }\n": typeof types.TrailPageFragmentDoc,
    "\n  query GetTrailMeta($slug: String!) {\n    trail(where: { slug: $slug }) {\n      title\n      description\n    }\n  }\n": typeof types.GetTrailMetaDocument,
    "\n  query GetTrail(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    trail(where: { slug: $slug }) {\n      ...TrailPage \n    }\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": typeof types.GetTrailDocument,
    "\n  fragment PageMap on BasePage {\n    title\n  }\n": typeof types.PageMapFragmentDoc,
    "\n  query GetAlerts {\n    alerts {\n      id\n      title\n      urgency\n      body\n    }\n  }\n": typeof types.GetAlertsDocument,
    "\n  query GetDocumentCollection($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        title\n        file {\n          url\n        }\n      }\n    }\n  }\n": typeof types.GetDocumentCollectionDocument,
    "\n  query GetInternalLinkData($id: ID!, $list: String!) {\n    getInternalLink(id: $id, type: $list) {\n      ... on BasePageWithSlug {\n        title\n        slug\n      }\n\n      ... on BasePage {\n        title\n      }\n\n      ... on Url {\n        title\n        url\n      }\n    }\n  }\n": typeof types.GetInternalLinkDataDocument,
    "\n  query GetServicePrimaryAction($slug: String!) {\n    service(where: { slug: $slug }) {\n      primaryAction {\n        label\n        url {\n          url\n        }\n      }\n    }\n  }\n": typeof types.GetServicePrimaryActionDocument,
    "\n  fragment AssemblyMemberInfo on AssemblyDistrict {\n    title\n    memberName\n    phone\n    email\n    bio\n    photo {\n      file {\n        url\n      }\n    }\n  }\n": typeof types.AssemblyMemberInfoFragmentDoc,
    "\n  fragment ContactFields on Contact {\n    id\n    name\n    phone\n    email\n    title\n  }\n": typeof types.ContactFieldsFragmentDoc,
    "\n  fragment ActionFields on InternalLink {\n    id\n    label\n    item {\n      __typename\n      ... on BasePageWithSlug {\n        id\n        slug\n        title\n        description\n      }\n      ... on Url {\n        id\n        url\n        title\n        description\n      }\n    }\n  }\n": typeof types.ActionFieldsFragmentDoc,
    "\n  fragment BoardDocumentList on Document {\n    id\n    ...BoardDocumentLink\n  }\n": typeof types.BoardDocumentListFragmentDoc,
    "\n  fragment DistrictDetailFields on AssemblyDistrict {\n    id\n    title\n    slug\n    description\n    memberName\n    photo {\n      file {\n        url\n      }\n    }\n  }\n": typeof types.DistrictDetailFieldsFragmentDoc,
    "\n  fragment DocumentFields on Document {\n    id\n    title\n    file {\n      filename\n      url\n      filesize\n    }\n  }\n": typeof types.DocumentFieldsFragmentDoc,
    "\n  fragment BoardDocumentLink on Document {\n    title\n    file {\n      url\n    }\n  }\n": typeof types.BoardDocumentLinkFragmentDoc,
    "\n  fragment ExternalActionButton on ExternalLink {\n    label\n    url {\n      url\n    }\n  }\n": typeof types.ExternalActionButtonFragmentDoc,
    "\n  fragment HourFields on OperatingHour {\n    day\n    open\n    close\n  }\n": typeof types.HourFieldsFragmentDoc,
    "\n  fragment OrgUnitFields on OrgUnit {\n    id\n    title\n    slug\n    description\n  }\n": typeof types.OrgUnitFieldsFragmentDoc,
    "\n  fragment ExternalActionFields on ExternalLink {\n    id\n    label\n    url {\n      id\n      title\n      url\n    }\n  }\n": typeof types.ExternalActionFieldsFragmentDoc,
    "\n  fragment AddressFields on Location {\n    title\n    lineOne\n    lineTwo\n    city\n    state\n    zip\n  }\n": typeof types.AddressFieldsFragmentDoc,
    "\n  fragment PageBody on BasePage {\n    __typename\n    title\n    body\n    description\n  }\n": typeof types.PageBodyFragmentDoc,
    "\n  fragment ChildrenOrgUnits on OrgUnit {\n    id\n    ...OrgUnitFields\n  }\n": typeof types.ChildrenOrgUnitsFragmentDoc,
    "\n  fragment ContactList on Contact {\n    id,\n    ...ContactFields\n  }\n": typeof types.ContactListFragmentDoc,
    "\n  fragment DistrictList on AssemblyDistrict {\n    id\n    ...DistrictDetailFields\n  }\n": typeof types.DistrictListFragmentDoc,
    "\n  fragment DocumentList on Document {\n    id\n    ...DocumentFields\n  }\n": typeof types.DocumentListFragmentDoc,
    "\n  fragment FacilitiesList on BasePage {\n    id\n    ...FacilityCard\n  }\n": typeof types.FacilitiesListFragmentDoc,
    "\n  fragment FacilityCard on Facility {\n    title\n    slug\n    description\n  }\n": typeof types.FacilityCardFragmentDoc,
    "\n  fragment HeroImage on BasePage {\n    heroImage\n  }\n": typeof types.HeroImageFragmentDoc,
    "\n  fragment HourList on OperatingHour {\n    id\n    ...HourFields\n  }\n": typeof types.HourListFragmentDoc,
    "\n  fragment PageItem on BasePageWithSlug {\n    title\n    slug\n    description\n  }\n": typeof types.PageItemFragmentDoc,
    "\n  fragment PageList on BasePageWithSlug {\n    id\n    ...PageItem\n  }\n": typeof types.PageListFragmentDoc,
    "\n  fragment ServiceList on Service {\n    id\n    ...ServiceFields\n  }\n": typeof types.ServiceListFragmentDoc,
    "\n  fragment ToolbeltItems on HomePage {\n    toolbeltOne {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltTwo {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltThree {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltFour {\n      id\n      ...ToolbeltHighlight\n    }    \n  }\n": typeof types.ToolbeltItemsFragmentDoc,
    "\n  fragment TopicList on Topic {\n    id\n    ...TopicFields\n  }\n": typeof types.TopicListFragmentDoc,
    "\n  fragment TrailInfo on Trail {\n    spring\n    summer\n    fall\n    winter\n    hiking\n    biking\n    horsebackRiding\n    crossCountrySkiing\n    snowshoeing\n    atv\n    dirtBiking\n    snowMachining\n    dogWalking\n    frisbeeGolf\n    running\n    mushing\n    open\n    difficulty\n    length\n    elevationChange\n    open\n  }\n": typeof types.TrailInfoFragmentDoc,
    "\n  fragment PublicNoticeFields on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n": typeof types.PublicNoticeFieldsFragmentDoc,
    "\n  fragment ServiceFields on Service {\n    id\n    title\n    slug\n    description\n  }\n": typeof types.ServiceFieldsFragmentDoc,
    "\n    fragment TopicFields on Topic {\n    id\n    title\n    slug\n    description\n  }\n": typeof types.TopicFieldsFragmentDoc,
    "\n  fragment ToolbeltHighlight on Highlight {\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          id\n          slug\n          title\n        }\n\n        ... on Url {\n          id\n          url\n          title          \n        }\n      }\n    }\n  }\n": typeof types.ToolbeltHighlightFragmentDoc,
    "\n  fragment HomePageHighlightCard on Highlight {\n    title\n    image\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          slug\n          title\n        }\n        ... on Url {\n          url\n          title\n        }\n      }\n    }\n  }\n": typeof types.HomePageHighlightCardFragmentDoc,
    "\n  fragment HomePageHighlights on HomePage {\n    highlightOne {\n      id\n      ...HomePageHighlightCard\n    }\n    highlightTwo {\n      id\n      ...HomePageHighlightCard\n    }\n    highlightThree {\n      id\n      ...HomePageHighlightCard\n    }\n  }\n": typeof types.HomePageHighlightsFragmentDoc,
    "\n  fragment PublicNoticeList on PublicNotice {\n    id\n    ...PublicNoticeFields\n  }\n": typeof types.PublicNoticeListFragmentDoc,
    "\n  query GetDocumentCollectionWidget($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        title\n        file {\n          url\n          filename\n          filesize\n        }\n      }\n    }\n  }\n": typeof types.GetDocumentCollectionWidgetDocument,
};
const documents: Documents = {
    "\n  query GetBoard($where: BoardWhereUniqueInput!) {\n    board(where: $where) {\n      body\n      description\n      title\n      ...HeroImage\n      meetingSchedule\n      isActive\n      communities {\n        ...PageList\n      }\n      districts {\n        ...DistrictDetailFields\n      }\n      linkToAgendas {\n        ...ExternalActionButton\n      }\n      linkToResolutions {\n        ...ExternalActionButton\n      }\n      linkToPublicOpinionMessage {\n        ...ExternalActionButton\n      }\n      contacts {\n        ...ContactFields\n      }\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n    }\n  }\n": types.GetBoardDocument,
    "\n    query GetBoards($take: Int, $skip: Int, $where: BoardWhereInput) {\n    boards(take: $take, where: $where, skip: $skip) {\n      id\n      title\n      slug\n      description\n      isActive\n      type\n      meetingSchedule\n    }\n  }\n": types.GetBoardsDocument,
    "\n  query GetBoardsPage {\n    boardPage {\n      ...PageBody\n      ...HeroImage\n      vacancyReport {\n        ...BoardDocumentLink\n      }\n      documents {\n        ...BoardDocumentList\n      }\n      applicationForm {\n        ...BoardDocumentLink\n      }\n\n      contacts {\n        ...ContactFields\n      }\n\n      actions {\n        ...ActionFields\n      }\n    }\n  }\n": types.GetBoardsPageDocument,
    "\n  query GetCommunity(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    community(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      ...PageMap\n      boards {\n        ...PageList\n      }\n      topics {\n        ...TopicFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      services {\n        ...ServiceFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      districts {\n        ...DistrictDetailFields\n      }\n    }\n\n    publicNotices(\n      where: { communities: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": types.GetCommunityDocument,
    "\n  query GetOrgUnit(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    orgUnit(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      topics {\n        ...TopicFields\n      }\n      children {\n        ...OrgUnitFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      parent {\n        ...OrgUnitFields\n      }\n      services {\n        ...ServiceFields\n      }\n    }\n    publicNotices(\n      where: { orgUnits: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n  ": types.GetOrgUnitDocument,
    "\n    query GetAssemblyDistrict(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    assemblyDistrict(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody      \n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      topics {\n        ...TopicFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      \n      ...AssemblyMemberInfo\n      address {\n        ...AddressFields\n      }\n    }\n\n    publicNotices(\n      where: { assemblyDistricts: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": types.GetAssemblyDistrictDocument,
    "\n  query GetFacility(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    facility(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n\n      topics {\n        ...PageList\n      }\n      park {\n        ...PageList\n      }\n      services {\n        ...ServiceFields\n      }\n      address {\n        ...AddressFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      hours {\n        ...HourFields\n      }\n    }\n\n    publicNotices(\n      where: { communities: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": types.GetFacilityDocument,
    "\n  query GetHomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {\n    homePage {\n      id\n      title\n      description\n      heroImage\n      ...ToolbeltItems\n      ...HomePageHighlights\n    }\n\n    publicNotices(take: $take, orderBy: $orderBy) {\n      ...PublicNoticeList\n    }\n  }\n": types.GetHomePageDocument,
    "\n  query GetPark(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    park(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      services {\n        ...ServiceFields\n      }\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourFields\n      }\n      trails {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n    }\n\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": types.GetParkDocument,
    "\n  query GetPublicNotice($slug: String!) {\n    publicNotice(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody\n      contacts {\n        ...ContactFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      topics {\n        ...PageList\n      }\n      communities {\n        ...PageList\n      }\n      assemblyDistricts {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      orgUnits {\n        ...PageList\n      }\n      boards {\n        ...PageList\n      }\n      services {\n        ...ServiceFields\n      }\n    }\n  }\n": types.GetPublicNoticeDocument,
    "\n  query GetService(\n    $slug: String!,\n    $take: Int = 5,\n    $orderDirection: OrderDirection = desc\n  ) {\n    service(where: { slug: $slug}) {\n      ...PageBody\n      ...HeroImage\n      documents {\n        ...DocumentList\n      }\n      primaryAction {\n        ...ExternalActionFields\n      }\n      secondaryActions {\n        ...ExternalActionFields\n      }\n      primaryContact {\n        ...ContactList\n      }\n      contacts {\n        ...ContactList\n      }\n    }\n\n    publicNotices(\n      where: { services: { some: { slug: { equals: $slug } } } }, \n      take: $take, \n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": types.GetServiceDocument,
    "\n  fragment TrailPage on Trail {\n    id\n    title\n    body\n    heroImage\n    description\n    ...TrailInfo\n    topics {\n      ...TopicFields\n    }\n    actions {\n      ...ActionFields\n    }\n    documents {\n      ...DocumentFields\n    }\n    park {\n      ...PageList\n    }\n    contacts {\n      ...ContactFields\n    }\n    address {\n      ...AddressFields\n    }\n    services {\n      ...ServiceFields\n    }\n  }\n": types.TrailPageFragmentDoc,
    "\n  query GetTrailMeta($slug: String!) {\n    trail(where: { slug: $slug }) {\n      title\n      description\n    }\n  }\n": types.GetTrailMetaDocument,
    "\n  query GetTrail(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    trail(where: { slug: $slug }) {\n      ...TrailPage \n    }\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": types.GetTrailDocument,
    "\n  fragment PageMap on BasePage {\n    title\n  }\n": types.PageMapFragmentDoc,
    "\n  query GetAlerts {\n    alerts {\n      id\n      title\n      urgency\n      body\n    }\n  }\n": types.GetAlertsDocument,
    "\n  query GetDocumentCollection($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        title\n        file {\n          url\n        }\n      }\n    }\n  }\n": types.GetDocumentCollectionDocument,
    "\n  query GetInternalLinkData($id: ID!, $list: String!) {\n    getInternalLink(id: $id, type: $list) {\n      ... on BasePageWithSlug {\n        title\n        slug\n      }\n\n      ... on BasePage {\n        title\n      }\n\n      ... on Url {\n        title\n        url\n      }\n    }\n  }\n": types.GetInternalLinkDataDocument,
    "\n  query GetServicePrimaryAction($slug: String!) {\n    service(where: { slug: $slug }) {\n      primaryAction {\n        label\n        url {\n          url\n        }\n      }\n    }\n  }\n": types.GetServicePrimaryActionDocument,
    "\n  fragment AssemblyMemberInfo on AssemblyDistrict {\n    title\n    memberName\n    phone\n    email\n    bio\n    photo {\n      file {\n        url\n      }\n    }\n  }\n": types.AssemblyMemberInfoFragmentDoc,
    "\n  fragment ContactFields on Contact {\n    id\n    name\n    phone\n    email\n    title\n  }\n": types.ContactFieldsFragmentDoc,
    "\n  fragment ActionFields on InternalLink {\n    id\n    label\n    item {\n      __typename\n      ... on BasePageWithSlug {\n        id\n        slug\n        title\n        description\n      }\n      ... on Url {\n        id\n        url\n        title\n        description\n      }\n    }\n  }\n": types.ActionFieldsFragmentDoc,
    "\n  fragment BoardDocumentList on Document {\n    id\n    ...BoardDocumentLink\n  }\n": types.BoardDocumentListFragmentDoc,
    "\n  fragment DistrictDetailFields on AssemblyDistrict {\n    id\n    title\n    slug\n    description\n    memberName\n    photo {\n      file {\n        url\n      }\n    }\n  }\n": types.DistrictDetailFieldsFragmentDoc,
    "\n  fragment DocumentFields on Document {\n    id\n    title\n    file {\n      filename\n      url\n      filesize\n    }\n  }\n": types.DocumentFieldsFragmentDoc,
    "\n  fragment BoardDocumentLink on Document {\n    title\n    file {\n      url\n    }\n  }\n": types.BoardDocumentLinkFragmentDoc,
    "\n  fragment ExternalActionButton on ExternalLink {\n    label\n    url {\n      url\n    }\n  }\n": types.ExternalActionButtonFragmentDoc,
    "\n  fragment HourFields on OperatingHour {\n    day\n    open\n    close\n  }\n": types.HourFieldsFragmentDoc,
    "\n  fragment OrgUnitFields on OrgUnit {\n    id\n    title\n    slug\n    description\n  }\n": types.OrgUnitFieldsFragmentDoc,
    "\n  fragment ExternalActionFields on ExternalLink {\n    id\n    label\n    url {\n      id\n      title\n      url\n    }\n  }\n": types.ExternalActionFieldsFragmentDoc,
    "\n  fragment AddressFields on Location {\n    title\n    lineOne\n    lineTwo\n    city\n    state\n    zip\n  }\n": types.AddressFieldsFragmentDoc,
    "\n  fragment PageBody on BasePage {\n    __typename\n    title\n    body\n    description\n  }\n": types.PageBodyFragmentDoc,
    "\n  fragment ChildrenOrgUnits on OrgUnit {\n    id\n    ...OrgUnitFields\n  }\n": types.ChildrenOrgUnitsFragmentDoc,
    "\n  fragment ContactList on Contact {\n    id,\n    ...ContactFields\n  }\n": types.ContactListFragmentDoc,
    "\n  fragment DistrictList on AssemblyDistrict {\n    id\n    ...DistrictDetailFields\n  }\n": types.DistrictListFragmentDoc,
    "\n  fragment DocumentList on Document {\n    id\n    ...DocumentFields\n  }\n": types.DocumentListFragmentDoc,
    "\n  fragment FacilitiesList on BasePage {\n    id\n    ...FacilityCard\n  }\n": types.FacilitiesListFragmentDoc,
    "\n  fragment FacilityCard on Facility {\n    title\n    slug\n    description\n  }\n": types.FacilityCardFragmentDoc,
    "\n  fragment HeroImage on BasePage {\n    heroImage\n  }\n": types.HeroImageFragmentDoc,
    "\n  fragment HourList on OperatingHour {\n    id\n    ...HourFields\n  }\n": types.HourListFragmentDoc,
    "\n  fragment PageItem on BasePageWithSlug {\n    title\n    slug\n    description\n  }\n": types.PageItemFragmentDoc,
    "\n  fragment PageList on BasePageWithSlug {\n    id\n    ...PageItem\n  }\n": types.PageListFragmentDoc,
    "\n  fragment ServiceList on Service {\n    id\n    ...ServiceFields\n  }\n": types.ServiceListFragmentDoc,
    "\n  fragment ToolbeltItems on HomePage {\n    toolbeltOne {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltTwo {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltThree {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltFour {\n      id\n      ...ToolbeltHighlight\n    }    \n  }\n": types.ToolbeltItemsFragmentDoc,
    "\n  fragment TopicList on Topic {\n    id\n    ...TopicFields\n  }\n": types.TopicListFragmentDoc,
    "\n  fragment TrailInfo on Trail {\n    spring\n    summer\n    fall\n    winter\n    hiking\n    biking\n    horsebackRiding\n    crossCountrySkiing\n    snowshoeing\n    atv\n    dirtBiking\n    snowMachining\n    dogWalking\n    frisbeeGolf\n    running\n    mushing\n    open\n    difficulty\n    length\n    elevationChange\n    open\n  }\n": types.TrailInfoFragmentDoc,
    "\n  fragment PublicNoticeFields on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n": types.PublicNoticeFieldsFragmentDoc,
    "\n  fragment ServiceFields on Service {\n    id\n    title\n    slug\n    description\n  }\n": types.ServiceFieldsFragmentDoc,
    "\n    fragment TopicFields on Topic {\n    id\n    title\n    slug\n    description\n  }\n": types.TopicFieldsFragmentDoc,
    "\n  fragment ToolbeltHighlight on Highlight {\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          id\n          slug\n          title\n        }\n\n        ... on Url {\n          id\n          url\n          title          \n        }\n      }\n    }\n  }\n": types.ToolbeltHighlightFragmentDoc,
    "\n  fragment HomePageHighlightCard on Highlight {\n    title\n    image\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          slug\n          title\n        }\n        ... on Url {\n          url\n          title\n        }\n      }\n    }\n  }\n": types.HomePageHighlightCardFragmentDoc,
    "\n  fragment HomePageHighlights on HomePage {\n    highlightOne {\n      id\n      ...HomePageHighlightCard\n    }\n    highlightTwo {\n      id\n      ...HomePageHighlightCard\n    }\n    highlightThree {\n      id\n      ...HomePageHighlightCard\n    }\n  }\n": types.HomePageHighlightsFragmentDoc,
    "\n  fragment PublicNoticeList on PublicNotice {\n    id\n    ...PublicNoticeFields\n  }\n": types.PublicNoticeListFragmentDoc,
    "\n  query GetDocumentCollectionWidget($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        title\n        file {\n          url\n          filename\n          filesize\n        }\n      }\n    }\n  }\n": types.GetDocumentCollectionWidgetDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBoard($where: BoardWhereUniqueInput!) {\n    board(where: $where) {\n      body\n      description\n      title\n      ...HeroImage\n      meetingSchedule\n      isActive\n      communities {\n        ...PageList\n      }\n      districts {\n        ...DistrictDetailFields\n      }\n      linkToAgendas {\n        ...ExternalActionButton\n      }\n      linkToResolutions {\n        ...ExternalActionButton\n      }\n      linkToPublicOpinionMessage {\n        ...ExternalActionButton\n      }\n      contacts {\n        ...ContactFields\n      }\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBoard($where: BoardWhereUniqueInput!) {\n    board(where: $where) {\n      body\n      description\n      title\n      ...HeroImage\n      meetingSchedule\n      isActive\n      communities {\n        ...PageList\n      }\n      districts {\n        ...DistrictDetailFields\n      }\n      linkToAgendas {\n        ...ExternalActionButton\n      }\n      linkToResolutions {\n        ...ExternalActionButton\n      }\n      linkToPublicOpinionMessage {\n        ...ExternalActionButton\n      }\n      contacts {\n        ...ContactFields\n      }\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetBoards($take: Int, $skip: Int, $where: BoardWhereInput) {\n    boards(take: $take, where: $where, skip: $skip) {\n      id\n      title\n      slug\n      description\n      isActive\n      type\n      meetingSchedule\n    }\n  }\n"): (typeof documents)["\n    query GetBoards($take: Int, $skip: Int, $where: BoardWhereInput) {\n    boards(take: $take, where: $where, skip: $skip) {\n      id\n      title\n      slug\n      description\n      isActive\n      type\n      meetingSchedule\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBoardsPage {\n    boardPage {\n      ...PageBody\n      ...HeroImage\n      vacancyReport {\n        ...BoardDocumentLink\n      }\n      documents {\n        ...BoardDocumentList\n      }\n      applicationForm {\n        ...BoardDocumentLink\n      }\n\n      contacts {\n        ...ContactFields\n      }\n\n      actions {\n        ...ActionFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBoardsPage {\n    boardPage {\n      ...PageBody\n      ...HeroImage\n      vacancyReport {\n        ...BoardDocumentLink\n      }\n      documents {\n        ...BoardDocumentList\n      }\n      applicationForm {\n        ...BoardDocumentLink\n      }\n\n      contacts {\n        ...ContactFields\n      }\n\n      actions {\n        ...ActionFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCommunity(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    community(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      ...PageMap\n      boards {\n        ...PageList\n      }\n      topics {\n        ...TopicFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      services {\n        ...ServiceFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      districts {\n        ...DistrictDetailFields\n      }\n    }\n\n    publicNotices(\n      where: { communities: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"): (typeof documents)["\n  query GetCommunity(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    community(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      ...PageMap\n      boards {\n        ...PageList\n      }\n      topics {\n        ...TopicFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      services {\n        ...ServiceFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      districts {\n        ...DistrictDetailFields\n      }\n    }\n\n    publicNotices(\n      where: { communities: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetOrgUnit(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    orgUnit(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      topics {\n        ...TopicFields\n      }\n      children {\n        ...OrgUnitFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      parent {\n        ...OrgUnitFields\n      }\n      services {\n        ...ServiceFields\n      }\n    }\n    publicNotices(\n      where: { orgUnits: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n  "): (typeof documents)["\n  query GetOrgUnit(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    orgUnit(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      topics {\n        ...TopicFields\n      }\n      children {\n        ...OrgUnitFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      parent {\n        ...OrgUnitFields\n      }\n      services {\n        ...ServiceFields\n      }\n    }\n    publicNotices(\n      where: { orgUnits: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAssemblyDistrict(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    assemblyDistrict(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody      \n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      topics {\n        ...TopicFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      \n      ...AssemblyMemberInfo\n      address {\n        ...AddressFields\n      }\n    }\n\n    publicNotices(\n      where: { assemblyDistricts: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"): (typeof documents)["\n    query GetAssemblyDistrict(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    assemblyDistrict(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody      \n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      topics {\n        ...TopicFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      \n      ...AssemblyMemberInfo\n      address {\n        ...AddressFields\n      }\n    }\n\n    publicNotices(\n      where: { assemblyDistricts: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFacility(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    facility(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n\n      topics {\n        ...PageList\n      }\n      park {\n        ...PageList\n      }\n      services {\n        ...ServiceFields\n      }\n      address {\n        ...AddressFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      hours {\n        ...HourFields\n      }\n    }\n\n    publicNotices(\n      where: { communities: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"): (typeof documents)["\n  query GetFacility(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    facility(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n\n      topics {\n        ...PageList\n      }\n      park {\n        ...PageList\n      }\n      services {\n        ...ServiceFields\n      }\n      address {\n        ...AddressFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      hours {\n        ...HourFields\n      }\n    }\n\n    publicNotices(\n      where: { communities: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetHomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {\n    homePage {\n      id\n      title\n      description\n      heroImage\n      ...ToolbeltItems\n      ...HomePageHighlights\n    }\n\n    publicNotices(take: $take, orderBy: $orderBy) {\n      ...PublicNoticeList\n    }\n  }\n"): (typeof documents)["\n  query GetHomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {\n    homePage {\n      id\n      title\n      description\n      heroImage\n      ...ToolbeltItems\n      ...HomePageHighlights\n    }\n\n    publicNotices(take: $take, orderBy: $orderBy) {\n      ...PublicNoticeList\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPark(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    park(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      services {\n        ...ServiceFields\n      }\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourFields\n      }\n      trails {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n    }\n\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"): (typeof documents)["\n  query GetPark(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    park(where: { slug: $slug }) {\n      ...PageBody\n      ...HeroImage\n      actions {\n        ...ActionFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      contacts {\n        ...ContactFields\n      }\n      services {\n        ...ServiceFields\n      }\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourFields\n      }\n      trails {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n    }\n\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPublicNotice($slug: String!) {\n    publicNotice(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody\n      contacts {\n        ...ContactFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      topics {\n        ...PageList\n      }\n      communities {\n        ...PageList\n      }\n      assemblyDistricts {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      orgUnits {\n        ...PageList\n      }\n      boards {\n        ...PageList\n      }\n      services {\n        ...ServiceFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPublicNotice($slug: String!) {\n    publicNotice(where: { slug: $slug }) {\n      ...HeroImage\n      ...PageBody\n      contacts {\n        ...ContactFields\n      }\n      documents {\n        ...DocumentFields\n      }\n      actions {\n        ...ActionFields\n      }\n      topics {\n        ...PageList\n      }\n      communities {\n        ...PageList\n      }\n      assemblyDistricts {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      orgUnits {\n        ...PageList\n      }\n      boards {\n        ...PageList\n      }\n      services {\n        ...ServiceFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetService(\n    $slug: String!,\n    $take: Int = 5,\n    $orderDirection: OrderDirection = desc\n  ) {\n    service(where: { slug: $slug}) {\n      ...PageBody\n      ...HeroImage\n      documents {\n        ...DocumentList\n      }\n      primaryAction {\n        ...ExternalActionFields\n      }\n      secondaryActions {\n        ...ExternalActionFields\n      }\n      primaryContact {\n        ...ContactList\n      }\n      contacts {\n        ...ContactList\n      }\n    }\n\n    publicNotices(\n      where: { services: { some: { slug: { equals: $slug } } } }, \n      take: $take, \n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"): (typeof documents)["\n  query GetService(\n    $slug: String!,\n    $take: Int = 5,\n    $orderDirection: OrderDirection = desc\n  ) {\n    service(where: { slug: $slug}) {\n      ...PageBody\n      ...HeroImage\n      documents {\n        ...DocumentList\n      }\n      primaryAction {\n        ...ExternalActionFields\n      }\n      secondaryActions {\n        ...ExternalActionFields\n      }\n      primaryContact {\n        ...ContactList\n      }\n      contacts {\n        ...ContactList\n      }\n    }\n\n    publicNotices(\n      where: { services: { some: { slug: { equals: $slug } } } }, \n      take: $take, \n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment TrailPage on Trail {\n    id\n    title\n    body\n    heroImage\n    description\n    ...TrailInfo\n    topics {\n      ...TopicFields\n    }\n    actions {\n      ...ActionFields\n    }\n    documents {\n      ...DocumentFields\n    }\n    park {\n      ...PageList\n    }\n    contacts {\n      ...ContactFields\n    }\n    address {\n      ...AddressFields\n    }\n    services {\n      ...ServiceFields\n    }\n  }\n"): (typeof documents)["\n  fragment TrailPage on Trail {\n    id\n    title\n    body\n    heroImage\n    description\n    ...TrailInfo\n    topics {\n      ...TopicFields\n    }\n    actions {\n      ...ActionFields\n    }\n    documents {\n      ...DocumentFields\n    }\n    park {\n      ...PageList\n    }\n    contacts {\n      ...ContactFields\n    }\n    address {\n      ...AddressFields\n    }\n    services {\n      ...ServiceFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTrailMeta($slug: String!) {\n    trail(where: { slug: $slug }) {\n      title\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetTrailMeta($slug: String!) {\n    trail(where: { slug: $slug }) {\n      title\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTrail(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    trail(where: { slug: $slug }) {\n      ...TrailPage \n    }\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"): (typeof documents)["\n  query GetTrail(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n  ) {\n    trail(where: { slug: $slug }) {\n      ...TrailPage \n    }\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PageMap on BasePage {\n    title\n  }\n"): (typeof documents)["\n  fragment PageMap on BasePage {\n    title\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAlerts {\n    alerts {\n      id\n      title\n      urgency\n      body\n    }\n  }\n"): (typeof documents)["\n  query GetAlerts {\n    alerts {\n      id\n      title\n      urgency\n      body\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDocumentCollection($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        title\n        file {\n          url\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDocumentCollection($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        title\n        file {\n          url\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetInternalLinkData($id: ID!, $list: String!) {\n    getInternalLink(id: $id, type: $list) {\n      ... on BasePageWithSlug {\n        title\n        slug\n      }\n\n      ... on BasePage {\n        title\n      }\n\n      ... on Url {\n        title\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetInternalLinkData($id: ID!, $list: String!) {\n    getInternalLink(id: $id, type: $list) {\n      ... on BasePageWithSlug {\n        title\n        slug\n      }\n\n      ... on BasePage {\n        title\n      }\n\n      ... on Url {\n        title\n        url\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetServicePrimaryAction($slug: String!) {\n    service(where: { slug: $slug }) {\n      primaryAction {\n        label\n        url {\n          url\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetServicePrimaryAction($slug: String!) {\n    service(where: { slug: $slug }) {\n      primaryAction {\n        label\n        url {\n          url\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment AssemblyMemberInfo on AssemblyDistrict {\n    title\n    memberName\n    phone\n    email\n    bio\n    photo {\n      file {\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment AssemblyMemberInfo on AssemblyDistrict {\n    title\n    memberName\n    phone\n    email\n    bio\n    photo {\n      file {\n        url\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ContactFields on Contact {\n    id\n    name\n    phone\n    email\n    title\n  }\n"): (typeof documents)["\n  fragment ContactFields on Contact {\n    id\n    name\n    phone\n    email\n    title\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ActionFields on InternalLink {\n    id\n    label\n    item {\n      __typename\n      ... on BasePageWithSlug {\n        id\n        slug\n        title\n        description\n      }\n      ... on Url {\n        id\n        url\n        title\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ActionFields on InternalLink {\n    id\n    label\n    item {\n      __typename\n      ... on BasePageWithSlug {\n        id\n        slug\n        title\n        description\n      }\n      ... on Url {\n        id\n        url\n        title\n        description\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment BoardDocumentList on Document {\n    id\n    ...BoardDocumentLink\n  }\n"): (typeof documents)["\n  fragment BoardDocumentList on Document {\n    id\n    ...BoardDocumentLink\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DistrictDetailFields on AssemblyDistrict {\n    id\n    title\n    slug\n    description\n    memberName\n    photo {\n      file {\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment DistrictDetailFields on AssemblyDistrict {\n    id\n    title\n    slug\n    description\n    memberName\n    photo {\n      file {\n        url\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DocumentFields on Document {\n    id\n    title\n    file {\n      filename\n      url\n      filesize\n    }\n  }\n"): (typeof documents)["\n  fragment DocumentFields on Document {\n    id\n    title\n    file {\n      filename\n      url\n      filesize\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment BoardDocumentLink on Document {\n    title\n    file {\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment BoardDocumentLink on Document {\n    title\n    file {\n      url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ExternalActionButton on ExternalLink {\n    label\n    url {\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment ExternalActionButton on ExternalLink {\n    label\n    url {\n      url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment HourFields on OperatingHour {\n    day\n    open\n    close\n  }\n"): (typeof documents)["\n  fragment HourFields on OperatingHour {\n    day\n    open\n    close\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment OrgUnitFields on OrgUnit {\n    id\n    title\n    slug\n    description\n  }\n"): (typeof documents)["\n  fragment OrgUnitFields on OrgUnit {\n    id\n    title\n    slug\n    description\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ExternalActionFields on ExternalLink {\n    id\n    label\n    url {\n      id\n      title\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment ExternalActionFields on ExternalLink {\n    id\n    label\n    url {\n      id\n      title\n      url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment AddressFields on Location {\n    title\n    lineOne\n    lineTwo\n    city\n    state\n    zip\n  }\n"): (typeof documents)["\n  fragment AddressFields on Location {\n    title\n    lineOne\n    lineTwo\n    city\n    state\n    zip\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PageBody on BasePage {\n    __typename\n    title\n    body\n    description\n  }\n"): (typeof documents)["\n  fragment PageBody on BasePage {\n    __typename\n    title\n    body\n    description\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ChildrenOrgUnits on OrgUnit {\n    id\n    ...OrgUnitFields\n  }\n"): (typeof documents)["\n  fragment ChildrenOrgUnits on OrgUnit {\n    id\n    ...OrgUnitFields\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ContactList on Contact {\n    id,\n    ...ContactFields\n  }\n"): (typeof documents)["\n  fragment ContactList on Contact {\n    id,\n    ...ContactFields\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DistrictList on AssemblyDistrict {\n    id\n    ...DistrictDetailFields\n  }\n"): (typeof documents)["\n  fragment DistrictList on AssemblyDistrict {\n    id\n    ...DistrictDetailFields\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DocumentList on Document {\n    id\n    ...DocumentFields\n  }\n"): (typeof documents)["\n  fragment DocumentList on Document {\n    id\n    ...DocumentFields\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FacilitiesList on BasePage {\n    id\n    ...FacilityCard\n  }\n"): (typeof documents)["\n  fragment FacilitiesList on BasePage {\n    id\n    ...FacilityCard\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FacilityCard on Facility {\n    title\n    slug\n    description\n  }\n"): (typeof documents)["\n  fragment FacilityCard on Facility {\n    title\n    slug\n    description\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment HeroImage on BasePage {\n    heroImage\n  }\n"): (typeof documents)["\n  fragment HeroImage on BasePage {\n    heroImage\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment HourList on OperatingHour {\n    id\n    ...HourFields\n  }\n"): (typeof documents)["\n  fragment HourList on OperatingHour {\n    id\n    ...HourFields\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PageItem on BasePageWithSlug {\n    title\n    slug\n    description\n  }\n"): (typeof documents)["\n  fragment PageItem on BasePageWithSlug {\n    title\n    slug\n    description\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PageList on BasePageWithSlug {\n    id\n    ...PageItem\n  }\n"): (typeof documents)["\n  fragment PageList on BasePageWithSlug {\n    id\n    ...PageItem\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ServiceList on Service {\n    id\n    ...ServiceFields\n  }\n"): (typeof documents)["\n  fragment ServiceList on Service {\n    id\n    ...ServiceFields\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ToolbeltItems on HomePage {\n    toolbeltOne {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltTwo {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltThree {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltFour {\n      id\n      ...ToolbeltHighlight\n    }    \n  }\n"): (typeof documents)["\n  fragment ToolbeltItems on HomePage {\n    toolbeltOne {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltTwo {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltThree {\n      id\n      ...ToolbeltHighlight\n    }\n    toolbeltFour {\n      id\n      ...ToolbeltHighlight\n    }    \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment TopicList on Topic {\n    id\n    ...TopicFields\n  }\n"): (typeof documents)["\n  fragment TopicList on Topic {\n    id\n    ...TopicFields\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment TrailInfo on Trail {\n    spring\n    summer\n    fall\n    winter\n    hiking\n    biking\n    horsebackRiding\n    crossCountrySkiing\n    snowshoeing\n    atv\n    dirtBiking\n    snowMachining\n    dogWalking\n    frisbeeGolf\n    running\n    mushing\n    open\n    difficulty\n    length\n    elevationChange\n    open\n  }\n"): (typeof documents)["\n  fragment TrailInfo on Trail {\n    spring\n    summer\n    fall\n    winter\n    hiking\n    biking\n    horsebackRiding\n    crossCountrySkiing\n    snowshoeing\n    atv\n    dirtBiking\n    snowMachining\n    dogWalking\n    frisbeeGolf\n    running\n    mushing\n    open\n    difficulty\n    length\n    elevationChange\n    open\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PublicNoticeFields on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n"): (typeof documents)["\n  fragment PublicNoticeFields on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ServiceFields on Service {\n    id\n    title\n    slug\n    description\n  }\n"): (typeof documents)["\n  fragment ServiceFields on Service {\n    id\n    title\n    slug\n    description\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment TopicFields on Topic {\n    id\n    title\n    slug\n    description\n  }\n"): (typeof documents)["\n    fragment TopicFields on Topic {\n    id\n    title\n    slug\n    description\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ToolbeltHighlight on Highlight {\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          id\n          slug\n          title\n        }\n\n        ... on Url {\n          id\n          url\n          title          \n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ToolbeltHighlight on Highlight {\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          id\n          slug\n          title\n        }\n\n        ... on Url {\n          id\n          url\n          title          \n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment HomePageHighlightCard on Highlight {\n    title\n    image\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          slug\n          title\n        }\n        ... on Url {\n          url\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment HomePageHighlightCard on Highlight {\n    title\n    image\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          slug\n          title\n        }\n        ... on Url {\n          url\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment HomePageHighlights on HomePage {\n    highlightOne {\n      id\n      ...HomePageHighlightCard\n    }\n    highlightTwo {\n      id\n      ...HomePageHighlightCard\n    }\n    highlightThree {\n      id\n      ...HomePageHighlightCard\n    }\n  }\n"): (typeof documents)["\n  fragment HomePageHighlights on HomePage {\n    highlightOne {\n      id\n      ...HomePageHighlightCard\n    }\n    highlightTwo {\n      id\n      ...HomePageHighlightCard\n    }\n    highlightThree {\n      id\n      ...HomePageHighlightCard\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PublicNoticeList on PublicNotice {\n    id\n    ...PublicNoticeFields\n  }\n"): (typeof documents)["\n  fragment PublicNoticeList on PublicNotice {\n    id\n    ...PublicNoticeFields\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDocumentCollectionWidget($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        title\n        file {\n          url\n          filename\n          filesize\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDocumentCollectionWidget($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        title\n        file {\n          url\n          filename\n          filesize\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;