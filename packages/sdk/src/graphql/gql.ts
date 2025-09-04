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
    "\n  fragment DocumentCollectionDisplay on DocumentCollection {\n    title\n    documents {\n      id\n      ...DocumentButton\n    }\n  }\n": typeof types.DocumentCollectionDisplayFragmentDoc,
    "\n  fragment DocumentButton on Document {\n    title\n    file {\n      url \n      filename\n      filesize\n    }\n  }\n": typeof types.DocumentButtonFragmentDoc,
    "\n  query GetTopicPage($slug: String, $now: DateTime!) {\n    topic(where: { slug: $slug }) {\n      ...BasePageInfo \n      boards {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...FacilitiesList\n      }            \n      plans {\n        ...PageList\n      }\n    }\n  }\n": typeof types.GetTopicPageDocument,
    "\n  query GetOrTopicMeta($slug: String) {\n    topic(where: { slug: $slug }) {\n      title\n      description\n    }\n  }\n": typeof types.GetOrTopicMetaDocument,
    "\n    query GetAssemblyDistrict(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    assemblyDistrict(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...AssemblyMemberInfo\n      address {\n        ...AddressFields\n      }\n    }\n  }\n": typeof types.GetAssemblyDistrictDocument,
    "\n  query GetBoard($where: BoardWhereUniqueInput!, $now: DateTime!) {\n    board(where: $where) {\n      ...BasePageInfo\n      ...BoardMeetings\n      directory {\n        ...DocumentLink\n      }\n      \n      linkToAgendas {\n        ...ExternalActionButton\n      }\n      linkToResolutions {\n        ...ExternalActionButton\n      }\n      linkToPublicOpinionMessage {\n        ...ExternalActionButton\n      }\n    }\n  }\n": typeof types.GetBoardDocument,
    "\n  query GetBoards($type: String, $search: String, $direction: OrderDirection = asc) {\n    boards(where: {\n      AND: [\n        {\n          type: {\n            equals: $type\n          },\n          isActive:  {\n            equals: true\n          }\n        },\n        {\n          OR: [\n            {title: {contains: $search, mode: insensitive}},\n          ]\n        }\n      ]\n    }, orderBy: {\n      title: $direction\n    }, ) {\n      id\n      title\n      slug\n      directory {\n        ...DocumentLink\n      }\n    }\n  }\n": typeof types.GetBoardsDocument,
    "\n  query GetBoardsPage {\n    boardPage {\n      ...PageBody\n      ...HeroImage\n      vacancyReport {\n        ...DocumentLink\n      }\n      documents {\n        ...BoardDocumentList\n      }\n      applicationForm {\n        ...DocumentLink\n      }\n\n      contacts {\n        ...ContactFields\n      }\n\n      actions {\n        ...ActionList\n      }\n      ParliTrainingLink{ \n        label\n        url {\n          title\n          url\n        }\n      }\n    }\n  }\n": typeof types.GetBoardsPageDocument,
    "\n  query GetCommunity(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    community(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...PageMap\n      boards {\n        ...PageList\n      }      \n    }\n  }\n": typeof types.GetCommunityDocument,
    "\n  query GetOrgUnit(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    orgUnit(where: { slug: $slug }) {\n      ...BasePageInfo\n      children {\n        ...ChildrenOrgUnits\n      }\n      parent {\n        ...OrgUnitFields\n      }\n    }\n    \n  }\n  ": typeof types.GetOrgUnitDocument,
    "\n  fragment GetAbsenteeVotingInfo on Query {\n    electionsPage {\n      stateElectionContact {\n        phone\n        name\n        ...ContactFields\n      }\n      boroughElectionContact {\n        phone\n        name\n        ...ContactFields\n      }\n      earlyVotingLocations(orderBy:  {\n         order: asc\n      }) {\n        order\n        title\n        address {\n          lineOne\n          lineTwo\n          city\n          state\n          zip\n        }\n        hours {\n          id\n          day\n          open\n          close\n        }\n      }\n\n    }\n    elections(take: 1, orderBy: { electionDate: desc}) {\n      earlyVotingStartDate\n      electionDate\n      absenteeVotingApplication {\n        ...DocumentLink\n      }\n      absenteeApplicationDeadline\n    }\n  }\n": typeof types.GetAbsenteeVotingInfoFragmentDoc,
    "\n  fragment CandidateFilingInfo on Election {\n    title\n    candidates {\n      id\n      ...DocumentLink\n    }\n    electionDate\n    officesToBeFilled\n    candidateFilingStartDate\n    candidateFilingDeadline\n    candidateFilingDocuments {\n      id\n      ...DocumentLink\n    }\n  }\n": typeof types.CandidateFilingInfoFragmentDoc,
    "\n  fragment ElectionContact on ElectionsPage {\n    boroughElectionContact {\n      name\n      phone\n      email\n    }\n  }\n": typeof types.ElectionContactFragmentDoc,
    "\n  fragment ElectionPageHeader on ElectionsPage {\n    howElectionsWork\n    title\n    description\n  }": typeof types.ElectionPageHeaderFragmentDoc,
    "\n  fragment ElectionPageQuickLinks on Election {\n    candidates {\n      ...DocumentLink\n    }\n    electionOfficialApplication {\n      ...DocumentLink\n    }\n    \n    result {\n      document {\n        ...DocumentLink\n      }\n    }\n  }\n": typeof types.ElectionPageQuickLinksFragmentDoc,
    "\n  fragment ElectionPollingPlaces on ElectionsPage {\n    stateElectionContact {\n      title\n      phone\n    }\n    \n    boroughElectionContact {\n      title\n      phone\n    }\n  }\n": typeof types.ElectionPollingPlacesFragmentDoc,
    "\n  fragment ElectionResultsList on ElectionResult {\n    id\n    election {\n      title\n      electionDate\n    }\n    document {\n      title\n      ...DocumentLink\n    }\n  }\n  \n": typeof types.ElectionResultsListFragmentDoc,
    "\n  fragment ElectionVoterInformation on Election {    \n    voterRegistrationDeadline\n    electionDate\n  }\n": typeof types.ElectionVoterInformationFragmentDoc,
    "\n  fragment ElectionsOfficialsInfo on Election {\n    electionOfficialApplicationDeadline\n    electionOfficialApplication {\n      ...DocumentLink\n    }\n  }\n": typeof types.ElectionsOfficialsInfoFragmentDoc,
    "\n  fragment ElectionOfficialContact on ElectionsPage {\n    boroughElectionContact {\n      name\n      email\n      phone\n    }\n  }\n": typeof types.ElectionOfficialContactFragmentDoc,
    "\n  fragment ElectionResult on Election {\n    title\n    electionDate\n    result {\n      document {\n        title\n        ...DocumentLink\n      }\n      isOfficial\n    }\n  }\n": typeof types.ElectionResultFragmentDoc,
    "\n    fragment ElectionResults on Query {\n      electionResults(take: 5) {\n        ...ElectionResultsList\n      } \n    }\n": typeof types.ElectionResultsFragmentDoc,
    "\n  fragment UpcomingElectionDetails on Election {\n    electionDate\n    candidateFilingStartDate\n    candidateFilingDeadline\n    earlyVotingStartDate\n    absenteeApplicationDeadline\n    voterRegistrationDeadline\n\n    electionBrochure {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    electionBallots {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    propositions {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    candidates {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n  }\n": typeof types.UpcomingElectionDetailsFragmentDoc,
    "\n  query GetElections {\n    ...ElectionResults\n    ...GetAbsenteeVotingInfo\n    electionsPage {\n      heroImage\n      ...ElectionPageHeader\n      ...ElectionPollingPlaces\n      ...ElectionContact\n      ...ElectionOfficialContact\n    }\n    elections(take: 1, orderBy:  {\n      electionDate: desc\n    }) {\n      ...ElectionPageQuickLinks\n      ...UpcomingElectionDetails\n      ...ElectionVoterInformation\n      ...CandidateFilingInfo\n      ...ElectionsOfficialsInfo\n      ...ElectionResult\n    }\n  }\n": typeof types.GetElectionsDocument,
    "\n  query GetResults($search: String) {\n    electionResults(where: {\n      OR: [\n        { election: { title: { contains: $search, mode: insensitive } } },\n        { document: { title: { contains: $search, mode: insensitive } } }\n        { document: { description: { contains: $search, mode: insensitive } } }\n      ]\n    }) {\n      id\n      ...ElectionResultsList\n    }\n  }\n": typeof types.GetResultsDocument,
    "\n  query GetFacility(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    facility(where: { slug: $slug }) {\n      ...BasePageInfo\n      park {\n        ...PageList\n      }\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourFields\n      }\n    }\n  }\n": typeof types.GetFacilityDocument,
    "\n  query GetHomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {\n    homePage {\n      id\n      title\n      description\n      heroImage\n      ...ToolbeltItems\n    }\n\n    publicNotices(take: $take, orderBy: $orderBy) {\n      ...PublicNoticeList\n    }\n\n    ...HomePageHighlights\n  }\n": typeof types.GetHomePageDocument,
    "\n  query GetPark(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    park(where: { slug: $slug }) {\n      ...BasePageInfo\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourList\n      }\n      trails {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n    }\n  }\n": typeof types.GetParkDocument,
    "\n  query GetPlan($slug: String!, $now: DateTime!) {\n    plan(where: { slug: $slug }) {\n      ...BasePageInfo\n      parent {\n        ...PageItem\n      }\n      components {\n        ...PageLinkList\n      }\n      currentDocument {\n        label\n        document {\n          ...DocumentLink\n        }\n      }\n      effort {\n        url {\n          url\n        }\n      }\n      autoRedirectToExternalWebsite\n      draftDocument {\n        label\n        document {\n          ...DocumentLink\n        }\n      }\n      pastDocuments {\n        id\n        label\n        document {\n          file {\n            url\n          }\n          ...DocumentLink\n        }\n      }\n    }\n  }\n": typeof types.GetPlanDocument,
    "\n  query GetPublicNotice($slug: String!, $now: DateTime!) {\n    publicNotice(where: { slug: $slug }) {\n      ...BasePageInfo\n      communities {\n        ...PageList\n      }\n      assemblyDistricts {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      orgUnits {\n        ...PageList\n      }\n      boards {\n        ...PageList\n      }\n    }\n  }\n": typeof types.GetPublicNoticeDocument,
    "\n  query GetService($slug: String!, $now: DateTime!) {\n    service(where: { slug: $slug}) {\n      ...BasePageInfo      \n    }\n  }\n": typeof types.GetServiceDocument,
    "\n  query GetTrail(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n    $now: DateTime!\n  ) {\n    trail(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...TrailInfo\n      park {\n        ...PageList\n      }\n      address {\n        ...AddressFields\n      }\n    }\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": typeof types.GetTrailDocument,
    "\n  fragment PageMap on BasePage {\n    title\n  }\n": typeof types.PageMapFragmentDoc,
    "\n  query GetAlerts {\n    alerts {\n      id\n      title\n      urgency\n      body\n    }\n  }\n": typeof types.GetAlertsDocument,
    "\n  query GetDocumentCollection($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        ...DocumentLink\n      }\n    }\n  }\n": typeof types.GetDocumentCollectionDocument,
    "\n  query GetInternalLinkData($id: ID!, $list: String!) {\n    getInternalLink(id: $id, type: $list) {\n      ... on BasePageWithSlug {\n        title\n        slug\n      }\n\n      ... on BasePage {\n        title\n      }\n\n      ... on Url {\n        title\n        url\n      }\n    }\n  }\n": typeof types.GetInternalLinkDataDocument,
    "\n  query GetServicePrimaryAction($slug: String!) {\n    service(where: { slug: $slug }) {\n      primaryAction {\n        label\n        url {\n          url\n        }\n      }\n    }\n  }\n": typeof types.GetServicePrimaryActionDocument,
    "\n  fragment AssemblyMemberInfo on AssemblyDistrict {\n    title\n    memberName\n    phone\n    email\n    bio\n    photo {\n      file {\n        url\n      }\n    }\n  }\n": typeof types.AssemblyMemberInfoFragmentDoc,
    "\n  fragment BasePageInfo on BasePageWithSlug {\n    ...PageBody\n    ...HeroImage\n    contacts {\n      ...ContactList\n    }\n    documents {\n      ...DocumentList\n    }\n    ...PageEvents\n    ...PagePublicNotices\n    topics {\n      ...TopicList\n    }\n    communities {\n      ...PageList\n    }\n    orgUnits {\n      ...PageList\n    }\n    \n    assemblyDistricts {\n      ...PageList\n    }\n    services {\n      ...PageList\n    }\n    ... on Service {\n      primaryContact {\n        ...ContactList\n      }\n      primaryAction {\n        ...ExternalActionFields\n      }\n      secondaryActions {\n        ...ExternalActionFields\n      }\n    }\n\n    ... on Plan {\n      effort {\n        ...ExternalActionFields\n      }\n    }\n\n    ... on BasePageWithActions {\n      actions {\n        ...ActionList\n      }\n    }\n  }\n": typeof types.BasePageInfoFragmentDoc,
    "\n  fragment ContactFields on Contact {\n    id\n    name\n    phone\n    email\n    title\n  }\n": typeof types.ContactFieldsFragmentDoc,
    "\n  fragment DocumentLink on Document {\n    title\n    file {\n      filename\n      url\n    }\n  }\n": typeof types.DocumentLinkFragmentDoc,
    "\n  fragment ActionFields on InternalLink {\n    id\n    label\n    item {\n      __typename\n      ... on BasePageWithSlug {\n        id\n        slug\n        title\n        description\n      }\n      ... on Url {\n        id\n        url\n        title\n        description\n      }\n    }\n  }\n": typeof types.ActionFieldsFragmentDoc,
    "\n  fragment BoardDocumentList on Document {\n    id\n    ...DocumentLink\n  }\n": typeof types.BoardDocumentListFragmentDoc,
    "\n  fragment BoardMeetings on Board {\n    title\n    calendarId\n    calendarQueryString\n    type\n  }\n": typeof types.BoardMeetingsFragmentDoc,
    "\n  fragment DistrictDetailFields on AssemblyDistrict {\n    id\n    title\n    slug\n    description\n    memberName\n    photo {\n      file {\n        url\n      }\n    }\n  }\n": typeof types.DistrictDetailFieldsFragmentDoc,
    "\n  fragment EventInfo on Event {\n    title\n    description\n    startDate\n  }\n": typeof types.EventInfoFragmentDoc,
    "\n  fragment ExternalActionButton on ExternalLink {\n    label\n    url {\n      url\n    }\n  }\n": typeof types.ExternalActionButtonFragmentDoc,
    "\n  fragment HourFields on OperatingHour {\n    day\n    open\n    close\n  }\n": typeof types.HourFieldsFragmentDoc,
    "\n  fragment OrgUnitFields on OrgUnit {\n    id\n    title\n    slug\n    description\n  }\n": typeof types.OrgUnitFieldsFragmentDoc,
    "\n  fragment ExternalActionFields on ExternalLink {\n    id\n    label\n    url {\n      id\n      title\n      url\n    }\n  }\n": typeof types.ExternalActionFieldsFragmentDoc,
    "\n  fragment ActionList on InternalLink {\n    id\n    ...ActionFields\n  }\n": typeof types.ActionListFragmentDoc,
    "\n  fragment AddressFields on Location {\n    title\n    lineOne\n    lineTwo\n    city\n    state\n    zip\n  }\n": typeof types.AddressFieldsFragmentDoc,
    "\n  fragment PageBody on BasePage {\n    __typename\n    title\n    body\n    description\n  }\n": typeof types.PageBodyFragmentDoc,
    "\n  fragment ChildrenOrgUnits on OrgUnit {\n    id\n    ...OrgUnitFields\n  }\n": typeof types.ChildrenOrgUnitsFragmentDoc,
    "\n  fragment ContactList on Contact {\n    id,\n    ...ContactFields\n  }\n": typeof types.ContactListFragmentDoc,
    "\n  fragment DistrictList on AssemblyDistrict {\n    id\n    ...DistrictDetailFields\n  }\n": typeof types.DistrictListFragmentDoc,
    "\n  fragment DocumentList on Document {\n    id\n    title\n    file {\n      url\n    }\n    ...DocumentLink\n  }\n": typeof types.DocumentListFragmentDoc,
    "\n    fragment PageEvents on BasePageWithSlug {\n      events(take: 4, orderBy:  {\n         startDate: desc\n      }, where:  {\n         startDate:  {\n            gte: $now\n         }\n      }) {\n        id\n        ...EventInfo\n      }\n    }\n": typeof types.PageEventsFragmentDoc,
    "\n  fragment FacilitiesList on Facility {\n    id\n    ...FacilityCard\n  }\n": typeof types.FacilitiesListFragmentDoc,
    "\n  fragment FacilityCard on Facility {\n    title\n    slug\n    description\n  }\n": typeof types.FacilityCardFragmentDoc,
    "\n  fragment HeroImage on BasePage {\n    heroImage\n  }\n": typeof types.HeroImageFragmentDoc,
    "\n  fragment HourList on OperatingHour {\n    id\n    ...HourFields\n  }\n": typeof types.HourListFragmentDoc,
    "\n  fragment PageItem on BasePageWithSlug {\n    title\n    slug\n    description\n  }\n": typeof types.PageItemFragmentDoc,
    "\n  fragment PageList on BasePageWithSlug {\n    id\n    ...PageItem\n  }\n": typeof types.PageListFragmentDoc,
    "\n  fragment PagePublicNotices on BasePageWithSlug {\n    publicNotices(take: 5 orderBy: { urgency: desc }) {\n      id\n      ...PublicNoticeFields\n    }\n  }\n": typeof types.PagePublicNoticesFragmentDoc,
    "\n  fragment ServiceList on Service {\n    id\n    ...ServiceFields\n  }\n": typeof types.ServiceListFragmentDoc,
    "\n  fragment ToolbeltItems on HomePage {\n    featuredItems(take: 7, orderBy: {order: asc}) {\n      id\n      ...ToolbeltHighlight\n    }\n  }\n": typeof types.ToolbeltItemsFragmentDoc,
    "\n  fragment TopicList on Topic {\n    id\n    ...TopicFields\n  }\n": typeof types.TopicListFragmentDoc,
    "\n  fragment TrailInfo on Trail {\n    spring\n    summer\n    fall\n    winter\n    hiking\n    biking\n    horsebackRiding\n    crossCountrySkiing\n    snowshoeing\n    atv\n    dirtBiking\n    snowMachining\n    dogWalking\n    frisbeeGolf\n    running\n    mushing\n    open\n    difficulty\n    length\n    elevationChange\n    open\n  }\n": typeof types.TrailInfoFragmentDoc,
    "\n  fragment PageLinkList on BasePageWithSlug {\n    id\n    slug\n    title\n  }\n": typeof types.PageLinkListFragmentDoc,
    "\n  fragment PublicNoticeFields on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n": typeof types.PublicNoticeFieldsFragmentDoc,
    "\n  fragment PublicNoticeInfo on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n": typeof types.PublicNoticeInfoFragmentDoc,
    "\n  fragment ServiceFields on Service {\n    id\n    title\n    slug\n    description\n  }\n": typeof types.ServiceFieldsFragmentDoc,
    "\n    fragment TopicFields on Topic {\n    id\n    title\n    slug\n    description\n  }\n": typeof types.TopicFieldsFragmentDoc,
    "\n  fragment ToolbeltHighlight on featuredItem {\n    icon\n    linkedItem {\n      label      \n      item {\n        __typename\n        ... on BasePageWithSlug {\n          id\n          slug\n          title\n        }\n\n        ... on Url {\n          id\n          url\n          title          \n        }\n      }\n    }\n  }\n": typeof types.ToolbeltHighlightFragmentDoc,
    "\n  fragment HomePageHighlightCard on Highlight {\n    title\n    image\n    message\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          slug\n          title\n        }\n        ... on Url {\n          url\n          title\n        }\n      }\n    }\n  }\n": typeof types.HomePageHighlightCardFragmentDoc,
    "\n  fragment HomePageHighlights on Query {\n    highlights(orderBy:  {\n       priority: asc\n    }) {\n      id\n      createdAt\n      priority\n      ...HomePageHighlightCard \n    }\n  }\n": typeof types.HomePageHighlightsFragmentDoc,
    "\n  fragment PublicNoticeList on PublicNotice {\n    id\n    ...PublicNoticeFields\n  }\n": typeof types.PublicNoticeListFragmentDoc,
    "\n  query getRedirects($path: String!) {\n    redirect(where: { from: $path }) {\n      to {\n        item {\n          __typename\n          ... on BasePageWithSlug {\n            slug\n          }\n          ... on Url {\n            url\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetRedirectsDocument,
    "\n  query GetDocumentCollectionWidget($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      ...DocumentCollectionDisplay\n    }\n  }\n": typeof types.GetDocumentCollectionWidgetDocument,
};
const documents: Documents = {
    "\n  fragment DocumentCollectionDisplay on DocumentCollection {\n    title\n    documents {\n      id\n      ...DocumentButton\n    }\n  }\n": types.DocumentCollectionDisplayFragmentDoc,
    "\n  fragment DocumentButton on Document {\n    title\n    file {\n      url \n      filename\n      filesize\n    }\n  }\n": types.DocumentButtonFragmentDoc,
    "\n  query GetTopicPage($slug: String, $now: DateTime!) {\n    topic(where: { slug: $slug }) {\n      ...BasePageInfo \n      boards {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...FacilitiesList\n      }            \n      plans {\n        ...PageList\n      }\n    }\n  }\n": types.GetTopicPageDocument,
    "\n  query GetOrTopicMeta($slug: String) {\n    topic(where: { slug: $slug }) {\n      title\n      description\n    }\n  }\n": types.GetOrTopicMetaDocument,
    "\n    query GetAssemblyDistrict(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    assemblyDistrict(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...AssemblyMemberInfo\n      address {\n        ...AddressFields\n      }\n    }\n  }\n": types.GetAssemblyDistrictDocument,
    "\n  query GetBoard($where: BoardWhereUniqueInput!, $now: DateTime!) {\n    board(where: $where) {\n      ...BasePageInfo\n      ...BoardMeetings\n      directory {\n        ...DocumentLink\n      }\n      \n      linkToAgendas {\n        ...ExternalActionButton\n      }\n      linkToResolutions {\n        ...ExternalActionButton\n      }\n      linkToPublicOpinionMessage {\n        ...ExternalActionButton\n      }\n    }\n  }\n": types.GetBoardDocument,
    "\n  query GetBoards($type: String, $search: String, $direction: OrderDirection = asc) {\n    boards(where: {\n      AND: [\n        {\n          type: {\n            equals: $type\n          },\n          isActive:  {\n            equals: true\n          }\n        },\n        {\n          OR: [\n            {title: {contains: $search, mode: insensitive}},\n          ]\n        }\n      ]\n    }, orderBy: {\n      title: $direction\n    }, ) {\n      id\n      title\n      slug\n      directory {\n        ...DocumentLink\n      }\n    }\n  }\n": types.GetBoardsDocument,
    "\n  query GetBoardsPage {\n    boardPage {\n      ...PageBody\n      ...HeroImage\n      vacancyReport {\n        ...DocumentLink\n      }\n      documents {\n        ...BoardDocumentList\n      }\n      applicationForm {\n        ...DocumentLink\n      }\n\n      contacts {\n        ...ContactFields\n      }\n\n      actions {\n        ...ActionList\n      }\n      ParliTrainingLink{ \n        label\n        url {\n          title\n          url\n        }\n      }\n    }\n  }\n": types.GetBoardsPageDocument,
    "\n  query GetCommunity(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    community(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...PageMap\n      boards {\n        ...PageList\n      }      \n    }\n  }\n": types.GetCommunityDocument,
    "\n  query GetOrgUnit(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    orgUnit(where: { slug: $slug }) {\n      ...BasePageInfo\n      children {\n        ...ChildrenOrgUnits\n      }\n      parent {\n        ...OrgUnitFields\n      }\n    }\n    \n  }\n  ": types.GetOrgUnitDocument,
    "\n  fragment GetAbsenteeVotingInfo on Query {\n    electionsPage {\n      stateElectionContact {\n        phone\n        name\n        ...ContactFields\n      }\n      boroughElectionContact {\n        phone\n        name\n        ...ContactFields\n      }\n      earlyVotingLocations(orderBy:  {\n         order: asc\n      }) {\n        order\n        title\n        address {\n          lineOne\n          lineTwo\n          city\n          state\n          zip\n        }\n        hours {\n          id\n          day\n          open\n          close\n        }\n      }\n\n    }\n    elections(take: 1, orderBy: { electionDate: desc}) {\n      earlyVotingStartDate\n      electionDate\n      absenteeVotingApplication {\n        ...DocumentLink\n      }\n      absenteeApplicationDeadline\n    }\n  }\n": types.GetAbsenteeVotingInfoFragmentDoc,
    "\n  fragment CandidateFilingInfo on Election {\n    title\n    candidates {\n      id\n      ...DocumentLink\n    }\n    electionDate\n    officesToBeFilled\n    candidateFilingStartDate\n    candidateFilingDeadline\n    candidateFilingDocuments {\n      id\n      ...DocumentLink\n    }\n  }\n": types.CandidateFilingInfoFragmentDoc,
    "\n  fragment ElectionContact on ElectionsPage {\n    boroughElectionContact {\n      name\n      phone\n      email\n    }\n  }\n": types.ElectionContactFragmentDoc,
    "\n  fragment ElectionPageHeader on ElectionsPage {\n    howElectionsWork\n    title\n    description\n  }": types.ElectionPageHeaderFragmentDoc,
    "\n  fragment ElectionPageQuickLinks on Election {\n    candidates {\n      ...DocumentLink\n    }\n    electionOfficialApplication {\n      ...DocumentLink\n    }\n    \n    result {\n      document {\n        ...DocumentLink\n      }\n    }\n  }\n": types.ElectionPageQuickLinksFragmentDoc,
    "\n  fragment ElectionPollingPlaces on ElectionsPage {\n    stateElectionContact {\n      title\n      phone\n    }\n    \n    boroughElectionContact {\n      title\n      phone\n    }\n  }\n": types.ElectionPollingPlacesFragmentDoc,
    "\n  fragment ElectionResultsList on ElectionResult {\n    id\n    election {\n      title\n      electionDate\n    }\n    document {\n      title\n      ...DocumentLink\n    }\n  }\n  \n": types.ElectionResultsListFragmentDoc,
    "\n  fragment ElectionVoterInformation on Election {    \n    voterRegistrationDeadline\n    electionDate\n  }\n": types.ElectionVoterInformationFragmentDoc,
    "\n  fragment ElectionsOfficialsInfo on Election {\n    electionOfficialApplicationDeadline\n    electionOfficialApplication {\n      ...DocumentLink\n    }\n  }\n": types.ElectionsOfficialsInfoFragmentDoc,
    "\n  fragment ElectionOfficialContact on ElectionsPage {\n    boroughElectionContact {\n      name\n      email\n      phone\n    }\n  }\n": types.ElectionOfficialContactFragmentDoc,
    "\n  fragment ElectionResult on Election {\n    title\n    electionDate\n    result {\n      document {\n        title\n        ...DocumentLink\n      }\n      isOfficial\n    }\n  }\n": types.ElectionResultFragmentDoc,
    "\n    fragment ElectionResults on Query {\n      electionResults(take: 5) {\n        ...ElectionResultsList\n      } \n    }\n": types.ElectionResultsFragmentDoc,
    "\n  fragment UpcomingElectionDetails on Election {\n    electionDate\n    candidateFilingStartDate\n    candidateFilingDeadline\n    earlyVotingStartDate\n    absenteeApplicationDeadline\n    voterRegistrationDeadline\n\n    electionBrochure {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    electionBallots {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    propositions {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    candidates {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n  }\n": types.UpcomingElectionDetailsFragmentDoc,
    "\n  query GetElections {\n    ...ElectionResults\n    ...GetAbsenteeVotingInfo\n    electionsPage {\n      heroImage\n      ...ElectionPageHeader\n      ...ElectionPollingPlaces\n      ...ElectionContact\n      ...ElectionOfficialContact\n    }\n    elections(take: 1, orderBy:  {\n      electionDate: desc\n    }) {\n      ...ElectionPageQuickLinks\n      ...UpcomingElectionDetails\n      ...ElectionVoterInformation\n      ...CandidateFilingInfo\n      ...ElectionsOfficialsInfo\n      ...ElectionResult\n    }\n  }\n": types.GetElectionsDocument,
    "\n  query GetResults($search: String) {\n    electionResults(where: {\n      OR: [\n        { election: { title: { contains: $search, mode: insensitive } } },\n        { document: { title: { contains: $search, mode: insensitive } } }\n        { document: { description: { contains: $search, mode: insensitive } } }\n      ]\n    }) {\n      id\n      ...ElectionResultsList\n    }\n  }\n": types.GetResultsDocument,
    "\n  query GetFacility(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    facility(where: { slug: $slug }) {\n      ...BasePageInfo\n      park {\n        ...PageList\n      }\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourFields\n      }\n    }\n  }\n": types.GetFacilityDocument,
    "\n  query GetHomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {\n    homePage {\n      id\n      title\n      description\n      heroImage\n      ...ToolbeltItems\n    }\n\n    publicNotices(take: $take, orderBy: $orderBy) {\n      ...PublicNoticeList\n    }\n\n    ...HomePageHighlights\n  }\n": types.GetHomePageDocument,
    "\n  query GetPark(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    park(where: { slug: $slug }) {\n      ...BasePageInfo\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourList\n      }\n      trails {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n    }\n  }\n": types.GetParkDocument,
    "\n  query GetPlan($slug: String!, $now: DateTime!) {\n    plan(where: { slug: $slug }) {\n      ...BasePageInfo\n      parent {\n        ...PageItem\n      }\n      components {\n        ...PageLinkList\n      }\n      currentDocument {\n        label\n        document {\n          ...DocumentLink\n        }\n      }\n      effort {\n        url {\n          url\n        }\n      }\n      autoRedirectToExternalWebsite\n      draftDocument {\n        label\n        document {\n          ...DocumentLink\n        }\n      }\n      pastDocuments {\n        id\n        label\n        document {\n          file {\n            url\n          }\n          ...DocumentLink\n        }\n      }\n    }\n  }\n": types.GetPlanDocument,
    "\n  query GetPublicNotice($slug: String!, $now: DateTime!) {\n    publicNotice(where: { slug: $slug }) {\n      ...BasePageInfo\n      communities {\n        ...PageList\n      }\n      assemblyDistricts {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      orgUnits {\n        ...PageList\n      }\n      boards {\n        ...PageList\n      }\n    }\n  }\n": types.GetPublicNoticeDocument,
    "\n  query GetService($slug: String!, $now: DateTime!) {\n    service(where: { slug: $slug}) {\n      ...BasePageInfo      \n    }\n  }\n": types.GetServiceDocument,
    "\n  query GetTrail(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n    $now: DateTime!\n  ) {\n    trail(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...TrailInfo\n      park {\n        ...PageList\n      }\n      address {\n        ...AddressFields\n      }\n    }\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n": types.GetTrailDocument,
    "\n  fragment PageMap on BasePage {\n    title\n  }\n": types.PageMapFragmentDoc,
    "\n  query GetAlerts {\n    alerts {\n      id\n      title\n      urgency\n      body\n    }\n  }\n": types.GetAlertsDocument,
    "\n  query GetDocumentCollection($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        ...DocumentLink\n      }\n    }\n  }\n": types.GetDocumentCollectionDocument,
    "\n  query GetInternalLinkData($id: ID!, $list: String!) {\n    getInternalLink(id: $id, type: $list) {\n      ... on BasePageWithSlug {\n        title\n        slug\n      }\n\n      ... on BasePage {\n        title\n      }\n\n      ... on Url {\n        title\n        url\n      }\n    }\n  }\n": types.GetInternalLinkDataDocument,
    "\n  query GetServicePrimaryAction($slug: String!) {\n    service(where: { slug: $slug }) {\n      primaryAction {\n        label\n        url {\n          url\n        }\n      }\n    }\n  }\n": types.GetServicePrimaryActionDocument,
    "\n  fragment AssemblyMemberInfo on AssemblyDistrict {\n    title\n    memberName\n    phone\n    email\n    bio\n    photo {\n      file {\n        url\n      }\n    }\n  }\n": types.AssemblyMemberInfoFragmentDoc,
    "\n  fragment BasePageInfo on BasePageWithSlug {\n    ...PageBody\n    ...HeroImage\n    contacts {\n      ...ContactList\n    }\n    documents {\n      ...DocumentList\n    }\n    ...PageEvents\n    ...PagePublicNotices\n    topics {\n      ...TopicList\n    }\n    communities {\n      ...PageList\n    }\n    orgUnits {\n      ...PageList\n    }\n    \n    assemblyDistricts {\n      ...PageList\n    }\n    services {\n      ...PageList\n    }\n    ... on Service {\n      primaryContact {\n        ...ContactList\n      }\n      primaryAction {\n        ...ExternalActionFields\n      }\n      secondaryActions {\n        ...ExternalActionFields\n      }\n    }\n\n    ... on Plan {\n      effort {\n        ...ExternalActionFields\n      }\n    }\n\n    ... on BasePageWithActions {\n      actions {\n        ...ActionList\n      }\n    }\n  }\n": types.BasePageInfoFragmentDoc,
    "\n  fragment ContactFields on Contact {\n    id\n    name\n    phone\n    email\n    title\n  }\n": types.ContactFieldsFragmentDoc,
    "\n  fragment DocumentLink on Document {\n    title\n    file {\n      filename\n      url\n    }\n  }\n": types.DocumentLinkFragmentDoc,
    "\n  fragment ActionFields on InternalLink {\n    id\n    label\n    item {\n      __typename\n      ... on BasePageWithSlug {\n        id\n        slug\n        title\n        description\n      }\n      ... on Url {\n        id\n        url\n        title\n        description\n      }\n    }\n  }\n": types.ActionFieldsFragmentDoc,
    "\n  fragment BoardDocumentList on Document {\n    id\n    ...DocumentLink\n  }\n": types.BoardDocumentListFragmentDoc,
    "\n  fragment BoardMeetings on Board {\n    title\n    calendarId\n    calendarQueryString\n    type\n  }\n": types.BoardMeetingsFragmentDoc,
    "\n  fragment DistrictDetailFields on AssemblyDistrict {\n    id\n    title\n    slug\n    description\n    memberName\n    photo {\n      file {\n        url\n      }\n    }\n  }\n": types.DistrictDetailFieldsFragmentDoc,
    "\n  fragment EventInfo on Event {\n    title\n    description\n    startDate\n  }\n": types.EventInfoFragmentDoc,
    "\n  fragment ExternalActionButton on ExternalLink {\n    label\n    url {\n      url\n    }\n  }\n": types.ExternalActionButtonFragmentDoc,
    "\n  fragment HourFields on OperatingHour {\n    day\n    open\n    close\n  }\n": types.HourFieldsFragmentDoc,
    "\n  fragment OrgUnitFields on OrgUnit {\n    id\n    title\n    slug\n    description\n  }\n": types.OrgUnitFieldsFragmentDoc,
    "\n  fragment ExternalActionFields on ExternalLink {\n    id\n    label\n    url {\n      id\n      title\n      url\n    }\n  }\n": types.ExternalActionFieldsFragmentDoc,
    "\n  fragment ActionList on InternalLink {\n    id\n    ...ActionFields\n  }\n": types.ActionListFragmentDoc,
    "\n  fragment AddressFields on Location {\n    title\n    lineOne\n    lineTwo\n    city\n    state\n    zip\n  }\n": types.AddressFieldsFragmentDoc,
    "\n  fragment PageBody on BasePage {\n    __typename\n    title\n    body\n    description\n  }\n": types.PageBodyFragmentDoc,
    "\n  fragment ChildrenOrgUnits on OrgUnit {\n    id\n    ...OrgUnitFields\n  }\n": types.ChildrenOrgUnitsFragmentDoc,
    "\n  fragment ContactList on Contact {\n    id,\n    ...ContactFields\n  }\n": types.ContactListFragmentDoc,
    "\n  fragment DistrictList on AssemblyDistrict {\n    id\n    ...DistrictDetailFields\n  }\n": types.DistrictListFragmentDoc,
    "\n  fragment DocumentList on Document {\n    id\n    title\n    file {\n      url\n    }\n    ...DocumentLink\n  }\n": types.DocumentListFragmentDoc,
    "\n    fragment PageEvents on BasePageWithSlug {\n      events(take: 4, orderBy:  {\n         startDate: desc\n      }, where:  {\n         startDate:  {\n            gte: $now\n         }\n      }) {\n        id\n        ...EventInfo\n      }\n    }\n": types.PageEventsFragmentDoc,
    "\n  fragment FacilitiesList on Facility {\n    id\n    ...FacilityCard\n  }\n": types.FacilitiesListFragmentDoc,
    "\n  fragment FacilityCard on Facility {\n    title\n    slug\n    description\n  }\n": types.FacilityCardFragmentDoc,
    "\n  fragment HeroImage on BasePage {\n    heroImage\n  }\n": types.HeroImageFragmentDoc,
    "\n  fragment HourList on OperatingHour {\n    id\n    ...HourFields\n  }\n": types.HourListFragmentDoc,
    "\n  fragment PageItem on BasePageWithSlug {\n    title\n    slug\n    description\n  }\n": types.PageItemFragmentDoc,
    "\n  fragment PageList on BasePageWithSlug {\n    id\n    ...PageItem\n  }\n": types.PageListFragmentDoc,
    "\n  fragment PagePublicNotices on BasePageWithSlug {\n    publicNotices(take: 5 orderBy: { urgency: desc }) {\n      id\n      ...PublicNoticeFields\n    }\n  }\n": types.PagePublicNoticesFragmentDoc,
    "\n  fragment ServiceList on Service {\n    id\n    ...ServiceFields\n  }\n": types.ServiceListFragmentDoc,
    "\n  fragment ToolbeltItems on HomePage {\n    featuredItems(take: 7, orderBy: {order: asc}) {\n      id\n      ...ToolbeltHighlight\n    }\n  }\n": types.ToolbeltItemsFragmentDoc,
    "\n  fragment TopicList on Topic {\n    id\n    ...TopicFields\n  }\n": types.TopicListFragmentDoc,
    "\n  fragment TrailInfo on Trail {\n    spring\n    summer\n    fall\n    winter\n    hiking\n    biking\n    horsebackRiding\n    crossCountrySkiing\n    snowshoeing\n    atv\n    dirtBiking\n    snowMachining\n    dogWalking\n    frisbeeGolf\n    running\n    mushing\n    open\n    difficulty\n    length\n    elevationChange\n    open\n  }\n": types.TrailInfoFragmentDoc,
    "\n  fragment PageLinkList on BasePageWithSlug {\n    id\n    slug\n    title\n  }\n": types.PageLinkListFragmentDoc,
    "\n  fragment PublicNoticeFields on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n": types.PublicNoticeFieldsFragmentDoc,
    "\n  fragment PublicNoticeInfo on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n": types.PublicNoticeInfoFragmentDoc,
    "\n  fragment ServiceFields on Service {\n    id\n    title\n    slug\n    description\n  }\n": types.ServiceFieldsFragmentDoc,
    "\n    fragment TopicFields on Topic {\n    id\n    title\n    slug\n    description\n  }\n": types.TopicFieldsFragmentDoc,
    "\n  fragment ToolbeltHighlight on featuredItem {\n    icon\n    linkedItem {\n      label      \n      item {\n        __typename\n        ... on BasePageWithSlug {\n          id\n          slug\n          title\n        }\n\n        ... on Url {\n          id\n          url\n          title          \n        }\n      }\n    }\n  }\n": types.ToolbeltHighlightFragmentDoc,
    "\n  fragment HomePageHighlightCard on Highlight {\n    title\n    image\n    message\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          slug\n          title\n        }\n        ... on Url {\n          url\n          title\n        }\n      }\n    }\n  }\n": types.HomePageHighlightCardFragmentDoc,
    "\n  fragment HomePageHighlights on Query {\n    highlights(orderBy:  {\n       priority: asc\n    }) {\n      id\n      createdAt\n      priority\n      ...HomePageHighlightCard \n    }\n  }\n": types.HomePageHighlightsFragmentDoc,
    "\n  fragment PublicNoticeList on PublicNotice {\n    id\n    ...PublicNoticeFields\n  }\n": types.PublicNoticeListFragmentDoc,
    "\n  query getRedirects($path: String!) {\n    redirect(where: { from: $path }) {\n      to {\n        item {\n          __typename\n          ... on BasePageWithSlug {\n            slug\n          }\n          ... on Url {\n            url\n          }\n        }\n      }\n    }\n  }\n": types.GetRedirectsDocument,
    "\n  query GetDocumentCollectionWidget($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      ...DocumentCollectionDisplay\n    }\n  }\n": types.GetDocumentCollectionWidgetDocument,
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
export function gql(source: "\n  fragment DocumentCollectionDisplay on DocumentCollection {\n    title\n    documents {\n      id\n      ...DocumentButton\n    }\n  }\n"): (typeof documents)["\n  fragment DocumentCollectionDisplay on DocumentCollection {\n    title\n    documents {\n      id\n      ...DocumentButton\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DocumentButton on Document {\n    title\n    file {\n      url \n      filename\n      filesize\n    }\n  }\n"): (typeof documents)["\n  fragment DocumentButton on Document {\n    title\n    file {\n      url \n      filename\n      filesize\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTopicPage($slug: String, $now: DateTime!) {\n    topic(where: { slug: $slug }) {\n      ...BasePageInfo \n      boards {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...FacilitiesList\n      }            \n      plans {\n        ...PageList\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTopicPage($slug: String, $now: DateTime!) {\n    topic(where: { slug: $slug }) {\n      ...BasePageInfo \n      boards {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...FacilitiesList\n      }            \n      plans {\n        ...PageList\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetOrTopicMeta($slug: String) {\n    topic(where: { slug: $slug }) {\n      title\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetOrTopicMeta($slug: String) {\n    topic(where: { slug: $slug }) {\n      title\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAssemblyDistrict(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    assemblyDistrict(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...AssemblyMemberInfo\n      address {\n        ...AddressFields\n      }\n    }\n  }\n"): (typeof documents)["\n    query GetAssemblyDistrict(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    assemblyDistrict(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...AssemblyMemberInfo\n      address {\n        ...AddressFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBoard($where: BoardWhereUniqueInput!, $now: DateTime!) {\n    board(where: $where) {\n      ...BasePageInfo\n      ...BoardMeetings\n      directory {\n        ...DocumentLink\n      }\n      \n      linkToAgendas {\n        ...ExternalActionButton\n      }\n      linkToResolutions {\n        ...ExternalActionButton\n      }\n      linkToPublicOpinionMessage {\n        ...ExternalActionButton\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBoard($where: BoardWhereUniqueInput!, $now: DateTime!) {\n    board(where: $where) {\n      ...BasePageInfo\n      ...BoardMeetings\n      directory {\n        ...DocumentLink\n      }\n      \n      linkToAgendas {\n        ...ExternalActionButton\n      }\n      linkToResolutions {\n        ...ExternalActionButton\n      }\n      linkToPublicOpinionMessage {\n        ...ExternalActionButton\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBoards($type: String, $search: String, $direction: OrderDirection = asc) {\n    boards(where: {\n      AND: [\n        {\n          type: {\n            equals: $type\n          },\n          isActive:  {\n            equals: true\n          }\n        },\n        {\n          OR: [\n            {title: {contains: $search, mode: insensitive}},\n          ]\n        }\n      ]\n    }, orderBy: {\n      title: $direction\n    }, ) {\n      id\n      title\n      slug\n      directory {\n        ...DocumentLink\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBoards($type: String, $search: String, $direction: OrderDirection = asc) {\n    boards(where: {\n      AND: [\n        {\n          type: {\n            equals: $type\n          },\n          isActive:  {\n            equals: true\n          }\n        },\n        {\n          OR: [\n            {title: {contains: $search, mode: insensitive}},\n          ]\n        }\n      ]\n    }, orderBy: {\n      title: $direction\n    }, ) {\n      id\n      title\n      slug\n      directory {\n        ...DocumentLink\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBoardsPage {\n    boardPage {\n      ...PageBody\n      ...HeroImage\n      vacancyReport {\n        ...DocumentLink\n      }\n      documents {\n        ...BoardDocumentList\n      }\n      applicationForm {\n        ...DocumentLink\n      }\n\n      contacts {\n        ...ContactFields\n      }\n\n      actions {\n        ...ActionList\n      }\n      ParliTrainingLink{ \n        label\n        url {\n          title\n          url\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBoardsPage {\n    boardPage {\n      ...PageBody\n      ...HeroImage\n      vacancyReport {\n        ...DocumentLink\n      }\n      documents {\n        ...BoardDocumentList\n      }\n      applicationForm {\n        ...DocumentLink\n      }\n\n      contacts {\n        ...ContactFields\n      }\n\n      actions {\n        ...ActionList\n      }\n      ParliTrainingLink{ \n        label\n        url {\n          title\n          url\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCommunity(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    community(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...PageMap\n      boards {\n        ...PageList\n      }      \n    }\n  }\n"): (typeof documents)["\n  query GetCommunity(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    community(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...PageMap\n      boards {\n        ...PageList\n      }      \n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetOrgUnit(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    orgUnit(where: { slug: $slug }) {\n      ...BasePageInfo\n      children {\n        ...ChildrenOrgUnits\n      }\n      parent {\n        ...OrgUnitFields\n      }\n    }\n    \n  }\n  "): (typeof documents)["\n  query GetOrgUnit(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    orgUnit(where: { slug: $slug }) {\n      ...BasePageInfo\n      children {\n        ...ChildrenOrgUnits\n      }\n      parent {\n        ...OrgUnitFields\n      }\n    }\n    \n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment GetAbsenteeVotingInfo on Query {\n    electionsPage {\n      stateElectionContact {\n        phone\n        name\n        ...ContactFields\n      }\n      boroughElectionContact {\n        phone\n        name\n        ...ContactFields\n      }\n      earlyVotingLocations(orderBy:  {\n         order: asc\n      }) {\n        order\n        title\n        address {\n          lineOne\n          lineTwo\n          city\n          state\n          zip\n        }\n        hours {\n          id\n          day\n          open\n          close\n        }\n      }\n\n    }\n    elections(take: 1, orderBy: { electionDate: desc}) {\n      earlyVotingStartDate\n      electionDate\n      absenteeVotingApplication {\n        ...DocumentLink\n      }\n      absenteeApplicationDeadline\n    }\n  }\n"): (typeof documents)["\n  fragment GetAbsenteeVotingInfo on Query {\n    electionsPage {\n      stateElectionContact {\n        phone\n        name\n        ...ContactFields\n      }\n      boroughElectionContact {\n        phone\n        name\n        ...ContactFields\n      }\n      earlyVotingLocations(orderBy:  {\n         order: asc\n      }) {\n        order\n        title\n        address {\n          lineOne\n          lineTwo\n          city\n          state\n          zip\n        }\n        hours {\n          id\n          day\n          open\n          close\n        }\n      }\n\n    }\n    elections(take: 1, orderBy: { electionDate: desc}) {\n      earlyVotingStartDate\n      electionDate\n      absenteeVotingApplication {\n        ...DocumentLink\n      }\n      absenteeApplicationDeadline\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CandidateFilingInfo on Election {\n    title\n    candidates {\n      id\n      ...DocumentLink\n    }\n    electionDate\n    officesToBeFilled\n    candidateFilingStartDate\n    candidateFilingDeadline\n    candidateFilingDocuments {\n      id\n      ...DocumentLink\n    }\n  }\n"): (typeof documents)["\n  fragment CandidateFilingInfo on Election {\n    title\n    candidates {\n      id\n      ...DocumentLink\n    }\n    electionDate\n    officesToBeFilled\n    candidateFilingStartDate\n    candidateFilingDeadline\n    candidateFilingDocuments {\n      id\n      ...DocumentLink\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ElectionContact on ElectionsPage {\n    boroughElectionContact {\n      name\n      phone\n      email\n    }\n  }\n"): (typeof documents)["\n  fragment ElectionContact on ElectionsPage {\n    boroughElectionContact {\n      name\n      phone\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ElectionPageHeader on ElectionsPage {\n    howElectionsWork\n    title\n    description\n  }"): (typeof documents)["\n  fragment ElectionPageHeader on ElectionsPage {\n    howElectionsWork\n    title\n    description\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ElectionPageQuickLinks on Election {\n    candidates {\n      ...DocumentLink\n    }\n    electionOfficialApplication {\n      ...DocumentLink\n    }\n    \n    result {\n      document {\n        ...DocumentLink\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ElectionPageQuickLinks on Election {\n    candidates {\n      ...DocumentLink\n    }\n    electionOfficialApplication {\n      ...DocumentLink\n    }\n    \n    result {\n      document {\n        ...DocumentLink\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ElectionPollingPlaces on ElectionsPage {\n    stateElectionContact {\n      title\n      phone\n    }\n    \n    boroughElectionContact {\n      title\n      phone\n    }\n  }\n"): (typeof documents)["\n  fragment ElectionPollingPlaces on ElectionsPage {\n    stateElectionContact {\n      title\n      phone\n    }\n    \n    boroughElectionContact {\n      title\n      phone\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ElectionResultsList on ElectionResult {\n    id\n    election {\n      title\n      electionDate\n    }\n    document {\n      title\n      ...DocumentLink\n    }\n  }\n  \n"): (typeof documents)["\n  fragment ElectionResultsList on ElectionResult {\n    id\n    election {\n      title\n      electionDate\n    }\n    document {\n      title\n      ...DocumentLink\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ElectionVoterInformation on Election {    \n    voterRegistrationDeadline\n    electionDate\n  }\n"): (typeof documents)["\n  fragment ElectionVoterInformation on Election {    \n    voterRegistrationDeadline\n    electionDate\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ElectionsOfficialsInfo on Election {\n    electionOfficialApplicationDeadline\n    electionOfficialApplication {\n      ...DocumentLink\n    }\n  }\n"): (typeof documents)["\n  fragment ElectionsOfficialsInfo on Election {\n    electionOfficialApplicationDeadline\n    electionOfficialApplication {\n      ...DocumentLink\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ElectionOfficialContact on ElectionsPage {\n    boroughElectionContact {\n      name\n      email\n      phone\n    }\n  }\n"): (typeof documents)["\n  fragment ElectionOfficialContact on ElectionsPage {\n    boroughElectionContact {\n      name\n      email\n      phone\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ElectionResult on Election {\n    title\n    electionDate\n    result {\n      document {\n        title\n        ...DocumentLink\n      }\n      isOfficial\n    }\n  }\n"): (typeof documents)["\n  fragment ElectionResult on Election {\n    title\n    electionDate\n    result {\n      document {\n        title\n        ...DocumentLink\n      }\n      isOfficial\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment ElectionResults on Query {\n      electionResults(take: 5) {\n        ...ElectionResultsList\n      } \n    }\n"): (typeof documents)["\n    fragment ElectionResults on Query {\n      electionResults(take: 5) {\n        ...ElectionResultsList\n      } \n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UpcomingElectionDetails on Election {\n    electionDate\n    candidateFilingStartDate\n    candidateFilingDeadline\n    earlyVotingStartDate\n    absenteeApplicationDeadline\n    voterRegistrationDeadline\n\n    electionBrochure {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    electionBallots {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    propositions {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    candidates {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n  }\n"): (typeof documents)["\n  fragment UpcomingElectionDetails on Election {\n    electionDate\n    candidateFilingStartDate\n    candidateFilingDeadline\n    earlyVotingStartDate\n    absenteeApplicationDeadline\n    voterRegistrationDeadline\n\n    electionBrochure {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    electionBallots {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    propositions {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n\n    candidates {\n      id\n      title\n      file {\n        url\n      }\n      ...DocumentLink\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetElections {\n    ...ElectionResults\n    ...GetAbsenteeVotingInfo\n    electionsPage {\n      heroImage\n      ...ElectionPageHeader\n      ...ElectionPollingPlaces\n      ...ElectionContact\n      ...ElectionOfficialContact\n    }\n    elections(take: 1, orderBy:  {\n      electionDate: desc\n    }) {\n      ...ElectionPageQuickLinks\n      ...UpcomingElectionDetails\n      ...ElectionVoterInformation\n      ...CandidateFilingInfo\n      ...ElectionsOfficialsInfo\n      ...ElectionResult\n    }\n  }\n"): (typeof documents)["\n  query GetElections {\n    ...ElectionResults\n    ...GetAbsenteeVotingInfo\n    electionsPage {\n      heroImage\n      ...ElectionPageHeader\n      ...ElectionPollingPlaces\n      ...ElectionContact\n      ...ElectionOfficialContact\n    }\n    elections(take: 1, orderBy:  {\n      electionDate: desc\n    }) {\n      ...ElectionPageQuickLinks\n      ...UpcomingElectionDetails\n      ...ElectionVoterInformation\n      ...CandidateFilingInfo\n      ...ElectionsOfficialsInfo\n      ...ElectionResult\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetResults($search: String) {\n    electionResults(where: {\n      OR: [\n        { election: { title: { contains: $search, mode: insensitive } } },\n        { document: { title: { contains: $search, mode: insensitive } } }\n        { document: { description: { contains: $search, mode: insensitive } } }\n      ]\n    }) {\n      id\n      ...ElectionResultsList\n    }\n  }\n"): (typeof documents)["\n  query GetResults($search: String) {\n    electionResults(where: {\n      OR: [\n        { election: { title: { contains: $search, mode: insensitive } } },\n        { document: { title: { contains: $search, mode: insensitive } } }\n        { document: { description: { contains: $search, mode: insensitive } } }\n      ]\n    }) {\n      id\n      ...ElectionResultsList\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFacility(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    facility(where: { slug: $slug }) {\n      ...BasePageInfo\n      park {\n        ...PageList\n      }\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFacility(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    facility(where: { slug: $slug }) {\n      ...BasePageInfo\n      park {\n        ...PageList\n      }\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourFields\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetHomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {\n    homePage {\n      id\n      title\n      description\n      heroImage\n      ...ToolbeltItems\n    }\n\n    publicNotices(take: $take, orderBy: $orderBy) {\n      ...PublicNoticeList\n    }\n\n    ...HomePageHighlights\n  }\n"): (typeof documents)["\n  query GetHomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {\n    homePage {\n      id\n      title\n      description\n      heroImage\n      ...ToolbeltItems\n    }\n\n    publicNotices(take: $take, orderBy: $orderBy) {\n      ...PublicNoticeList\n    }\n\n    ...HomePageHighlights\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPark(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    park(where: { slug: $slug }) {\n      ...BasePageInfo\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourList\n      }\n      trails {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPark(\n    $slug: String!\n    $now: DateTime!\n  ) {\n    park(where: { slug: $slug }) {\n      ...BasePageInfo\n      address {\n        ...AddressFields\n      }\n      hours {\n        ...HourList\n      }\n      trails {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPlan($slug: String!, $now: DateTime!) {\n    plan(where: { slug: $slug }) {\n      ...BasePageInfo\n      parent {\n        ...PageItem\n      }\n      components {\n        ...PageLinkList\n      }\n      currentDocument {\n        label\n        document {\n          ...DocumentLink\n        }\n      }\n      effort {\n        url {\n          url\n        }\n      }\n      autoRedirectToExternalWebsite\n      draftDocument {\n        label\n        document {\n          ...DocumentLink\n        }\n      }\n      pastDocuments {\n        id\n        label\n        document {\n          file {\n            url\n          }\n          ...DocumentLink\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPlan($slug: String!, $now: DateTime!) {\n    plan(where: { slug: $slug }) {\n      ...BasePageInfo\n      parent {\n        ...PageItem\n      }\n      components {\n        ...PageLinkList\n      }\n      currentDocument {\n        label\n        document {\n          ...DocumentLink\n        }\n      }\n      effort {\n        url {\n          url\n        }\n      }\n      autoRedirectToExternalWebsite\n      draftDocument {\n        label\n        document {\n          ...DocumentLink\n        }\n      }\n      pastDocuments {\n        id\n        label\n        document {\n          file {\n            url\n          }\n          ...DocumentLink\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPublicNotice($slug: String!, $now: DateTime!) {\n    publicNotice(where: { slug: $slug }) {\n      ...BasePageInfo\n      communities {\n        ...PageList\n      }\n      assemblyDistricts {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      orgUnits {\n        ...PageList\n      }\n      boards {\n        ...PageList\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPublicNotice($slug: String!, $now: DateTime!) {\n    publicNotice(where: { slug: $slug }) {\n      ...BasePageInfo\n      communities {\n        ...PageList\n      }\n      assemblyDistricts {\n        ...PageList\n      }\n      parks {\n        ...PageList\n      }\n      facilities {\n        ...PageList\n      }\n      trails {\n        ...PageList\n      }\n      orgUnits {\n        ...PageList\n      }\n      boards {\n        ...PageList\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetService($slug: String!, $now: DateTime!) {\n    service(where: { slug: $slug}) {\n      ...BasePageInfo      \n    }\n  }\n"): (typeof documents)["\n  query GetService($slug: String!, $now: DateTime!) {\n    service(where: { slug: $slug}) {\n      ...BasePageInfo      \n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTrail(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n    $now: DateTime!\n  ) {\n    trail(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...TrailInfo\n      park {\n        ...PageList\n      }\n      address {\n        ...AddressFields\n      }\n    }\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"): (typeof documents)["\n  query GetTrail(\n    $slug: String!\n    $take: Int = 5\n    $orderDirection: OrderDirection = desc\n    $now: DateTime!\n  ) {\n    trail(where: { slug: $slug }) {\n      ...BasePageInfo\n      ...TrailInfo\n      park {\n        ...PageList\n      }\n      address {\n        ...AddressFields\n      }\n    }\n    publicNotices(\n      where: { trails: { some: { slug: { equals: $slug } } } }\n      take: $take\n      orderBy: { urgency: $orderDirection }\n    ) {\n      ...PublicNoticeList\n    }\n  }\n"];
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
export function gql(source: "\n  query GetDocumentCollection($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        ...DocumentLink\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetDocumentCollection($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      id\n      title\n      documents {\n        id\n        ...DocumentLink\n      }\n    }\n  }\n"];
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
export function gql(source: "\n  fragment BasePageInfo on BasePageWithSlug {\n    ...PageBody\n    ...HeroImage\n    contacts {\n      ...ContactList\n    }\n    documents {\n      ...DocumentList\n    }\n    ...PageEvents\n    ...PagePublicNotices\n    topics {\n      ...TopicList\n    }\n    communities {\n      ...PageList\n    }\n    orgUnits {\n      ...PageList\n    }\n    \n    assemblyDistricts {\n      ...PageList\n    }\n    services {\n      ...PageList\n    }\n    ... on Service {\n      primaryContact {\n        ...ContactList\n      }\n      primaryAction {\n        ...ExternalActionFields\n      }\n      secondaryActions {\n        ...ExternalActionFields\n      }\n    }\n\n    ... on Plan {\n      effort {\n        ...ExternalActionFields\n      }\n    }\n\n    ... on BasePageWithActions {\n      actions {\n        ...ActionList\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment BasePageInfo on BasePageWithSlug {\n    ...PageBody\n    ...HeroImage\n    contacts {\n      ...ContactList\n    }\n    documents {\n      ...DocumentList\n    }\n    ...PageEvents\n    ...PagePublicNotices\n    topics {\n      ...TopicList\n    }\n    communities {\n      ...PageList\n    }\n    orgUnits {\n      ...PageList\n    }\n    \n    assemblyDistricts {\n      ...PageList\n    }\n    services {\n      ...PageList\n    }\n    ... on Service {\n      primaryContact {\n        ...ContactList\n      }\n      primaryAction {\n        ...ExternalActionFields\n      }\n      secondaryActions {\n        ...ExternalActionFields\n      }\n    }\n\n    ... on Plan {\n      effort {\n        ...ExternalActionFields\n      }\n    }\n\n    ... on BasePageWithActions {\n      actions {\n        ...ActionList\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ContactFields on Contact {\n    id\n    name\n    phone\n    email\n    title\n  }\n"): (typeof documents)["\n  fragment ContactFields on Contact {\n    id\n    name\n    phone\n    email\n    title\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DocumentLink on Document {\n    title\n    file {\n      filename\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment DocumentLink on Document {\n    title\n    file {\n      filename\n      url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ActionFields on InternalLink {\n    id\n    label\n    item {\n      __typename\n      ... on BasePageWithSlug {\n        id\n        slug\n        title\n        description\n      }\n      ... on Url {\n        id\n        url\n        title\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ActionFields on InternalLink {\n    id\n    label\n    item {\n      __typename\n      ... on BasePageWithSlug {\n        id\n        slug\n        title\n        description\n      }\n      ... on Url {\n        id\n        url\n        title\n        description\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment BoardDocumentList on Document {\n    id\n    ...DocumentLink\n  }\n"): (typeof documents)["\n  fragment BoardDocumentList on Document {\n    id\n    ...DocumentLink\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment BoardMeetings on Board {\n    title\n    calendarId\n    calendarQueryString\n    type\n  }\n"): (typeof documents)["\n  fragment BoardMeetings on Board {\n    title\n    calendarId\n    calendarQueryString\n    type\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DistrictDetailFields on AssemblyDistrict {\n    id\n    title\n    slug\n    description\n    memberName\n    photo {\n      file {\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment DistrictDetailFields on AssemblyDistrict {\n    id\n    title\n    slug\n    description\n    memberName\n    photo {\n      file {\n        url\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment EventInfo on Event {\n    title\n    description\n    startDate\n  }\n"): (typeof documents)["\n  fragment EventInfo on Event {\n    title\n    description\n    startDate\n  }\n"];
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
export function gql(source: "\n  fragment ActionList on InternalLink {\n    id\n    ...ActionFields\n  }\n"): (typeof documents)["\n  fragment ActionList on InternalLink {\n    id\n    ...ActionFields\n  }\n"];
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
export function gql(source: "\n  fragment DocumentList on Document {\n    id\n    title\n    file {\n      url\n    }\n    ...DocumentLink\n  }\n"): (typeof documents)["\n  fragment DocumentList on Document {\n    id\n    title\n    file {\n      url\n    }\n    ...DocumentLink\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment PageEvents on BasePageWithSlug {\n      events(take: 4, orderBy:  {\n         startDate: desc\n      }, where:  {\n         startDate:  {\n            gte: $now\n         }\n      }) {\n        id\n        ...EventInfo\n      }\n    }\n"): (typeof documents)["\n    fragment PageEvents on BasePageWithSlug {\n      events(take: 4, orderBy:  {\n         startDate: desc\n      }, where:  {\n         startDate:  {\n            gte: $now\n         }\n      }) {\n        id\n        ...EventInfo\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FacilitiesList on Facility {\n    id\n    ...FacilityCard\n  }\n"): (typeof documents)["\n  fragment FacilitiesList on Facility {\n    id\n    ...FacilityCard\n  }\n"];
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
export function gql(source: "\n  fragment PagePublicNotices on BasePageWithSlug {\n    publicNotices(take: 5 orderBy: { urgency: desc }) {\n      id\n      ...PublicNoticeFields\n    }\n  }\n"): (typeof documents)["\n  fragment PagePublicNotices on BasePageWithSlug {\n    publicNotices(take: 5 orderBy: { urgency: desc }) {\n      id\n      ...PublicNoticeFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ServiceList on Service {\n    id\n    ...ServiceFields\n  }\n"): (typeof documents)["\n  fragment ServiceList on Service {\n    id\n    ...ServiceFields\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ToolbeltItems on HomePage {\n    featuredItems(take: 7, orderBy: {order: asc}) {\n      id\n      ...ToolbeltHighlight\n    }\n  }\n"): (typeof documents)["\n  fragment ToolbeltItems on HomePage {\n    featuredItems(take: 7, orderBy: {order: asc}) {\n      id\n      ...ToolbeltHighlight\n    }\n  }\n"];
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
export function gql(source: "\n  fragment PageLinkList on BasePageWithSlug {\n    id\n    slug\n    title\n  }\n"): (typeof documents)["\n  fragment PageLinkList on BasePageWithSlug {\n    id\n    slug\n    title\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PublicNoticeFields on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n"): (typeof documents)["\n  fragment PublicNoticeFields on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PublicNoticeInfo on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n"): (typeof documents)["\n  fragment PublicNoticeInfo on PublicNotice {\n    id\n    title\n    description\n    slug\n    heroImage\n    urgency\n  }\n"];
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
export function gql(source: "\n  fragment ToolbeltHighlight on featuredItem {\n    icon\n    linkedItem {\n      label      \n      item {\n        __typename\n        ... on BasePageWithSlug {\n          id\n          slug\n          title\n        }\n\n        ... on Url {\n          id\n          url\n          title          \n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ToolbeltHighlight on featuredItem {\n    icon\n    linkedItem {\n      label      \n      item {\n        __typename\n        ... on BasePageWithSlug {\n          id\n          slug\n          title\n        }\n\n        ... on Url {\n          id\n          url\n          title          \n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment HomePageHighlightCard on Highlight {\n    title\n    image\n    message\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          slug\n          title\n        }\n        ... on Url {\n          url\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment HomePageHighlightCard on Highlight {\n    title\n    image\n    message\n    linkedItem {\n      label\n      item {\n        __typename\n        ... on BasePageWithSlug {\n          slug\n          title\n        }\n        ... on Url {\n          url\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment HomePageHighlights on Query {\n    highlights(orderBy:  {\n       priority: asc\n    }) {\n      id\n      createdAt\n      priority\n      ...HomePageHighlightCard \n    }\n  }\n"): (typeof documents)["\n  fragment HomePageHighlights on Query {\n    highlights(orderBy:  {\n       priority: asc\n    }) {\n      id\n      createdAt\n      priority\n      ...HomePageHighlightCard \n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PublicNoticeList on PublicNotice {\n    id\n    ...PublicNoticeFields\n  }\n"): (typeof documents)["\n  fragment PublicNoticeList on PublicNotice {\n    id\n    ...PublicNoticeFields\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getRedirects($path: String!) {\n    redirect(where: { from: $path }) {\n      to {\n        item {\n          __typename\n          ... on BasePageWithSlug {\n            slug\n          }\n          ... on Url {\n            url\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRedirects($path: String!) {\n    redirect(where: { from: $path }) {\n      to {\n        item {\n          __typename\n          ... on BasePageWithSlug {\n            slug\n          }\n          ... on Url {\n            url\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDocumentCollectionWidget($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      ...DocumentCollectionDisplay\n    }\n  }\n"): (typeof documents)["\n  query GetDocumentCollectionWidget($where: DocumentCollectionWhereUniqueInput!) {\n    documentCollection(where: $where) {\n      ...DocumentCollectionDisplay\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;