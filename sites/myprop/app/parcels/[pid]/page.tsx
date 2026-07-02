import { ParcelDetails } from '@/app/(backend)/api/v1/parcels/mockParcels';
import {
  DataTable,
  DataTableRow,
  PropertyRow,
  PropertyTable,
  SectionHeader,
} from '@/components/Tables';
import { propertyApiCall } from '@msb/property-sdk';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { MapModal } from './MapModal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MyProperty - Parcel Details',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MyParcelDetailPage(
  props: PageProps<'/parcels/[pid]'>,
) {
  const { pid } = await props.params;

  const { data } = await propertyApiCall<{ data: ParcelDetails }>(
    `/detail/${encodeURIComponent(pid)}`,
  );

  const formatCurrency = (value: number | null) => {
    if (value == null) return '--';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '--';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <main>
      <div className="pt-6">
        <div className="space-y-1 bg-white font-sans">
          <h1 className="text-xl font-bold">
            Real Property Detail for Account: {data.TAX_ID}
          </h1>
          <p>
            Last Updated:{' '}
            {format(new Date(data.LAST_UPDATED), 'M/d/yyyy h:mm aa')}
          </p>
          <section>
            <SectionHeader title="Site Information" />
            <TwoColumnWrapper>
              <PropertyTable>
                <PropertyRow label="Account Number" value={data.TAX_ID} />
                <PropertyRow label="Parcel ID" value={data.PARCEL_ID} />
                <PropertyRow label="TRS" value={data.TRS} />
                <PropertyRow
                  label="Abbreviated Description (Not for Convenience)"
                  value={data.LEGAL_DESC}
                />
              </PropertyTable>

              <PropertyTable>
                <PropertyRow label="Subdivision" value={data.SUBD_NAME} />
                <PropertyRow label="City" value={data.CITY} />
                <PropertyRow
                  label="Maps & Permits"
                  className="print:hidden"
                  value={
                    <div className="flex flex-col gap-1 sm:flex-row">
                      <Link
                        className="msb-btn-primary"
                        href={`https://parcelviewer.matsu.gov/vertigisstudio/web/?app=05240199d948427e88bf8ea2ebea9513&workflow=b3ee4694-fbe2-4683-b4e9-114fe8d4cca0&workflowParams=${data.PARCEL_ID}`}
                        title="View interactive maps in parcel viewer"
                      >
                        <span
                          className="icon-[mdi--location-outline] hover:icon-[] mr-1 size-5"
                          aria-hidden="true"
                        ></span>
                        Parcel Viewer
                      </Link>
                      <Link
                        className="msb-btn-primary"
                        href={`https://matanuskasusitnaboroughak-energovweb.tylerhost.net/apps/selfservice#/search?m=1&fm=3&ps=10&pn=1&em=true&st=${data.TAX_ID.substring(1)}`}
                        title="View permits for this property"
                      >
                        <span className="icon-[mdi--id-card] mr-1 size-5" />
                        View Permits
                      </Link>
                      <MapModal
                        pid={data.PARCEL_ID}
                        map={data.MAP}
                        accountId={data.TAX_ID}
                      />
                    </div>
                  }
                />
              </PropertyTable>
            </TwoColumnWrapper>
            <PropertyTable>
              {data.ADDRESSES?.length ? (
                data.ADDRESSES.map((address, idx) => (
                  <PropertyRow
                    key={idx}
                    label={`Site Address ${idx + 1}`}
                    value={address.FULL_ADDRESS}
                  />
                ))
              ) : (
                <PropertyRow
                  label="Site Address"
                  value={data.CITE_ADDRESS || '--'}
                />
              )}
              {/* <PropertyRow label="Site Address" value={data.CITE_ADDRESS} /> */}
            </PropertyTable>
          </section>
          <section>
            <SectionHeader title="Ownership" />
            <TwoColumnWrapper>
              <PropertyTable>
                <PropertyRow label="Owners" value={data.OWNER} />
                <PropertyRow
                  label="Owner's Primary Address"
                  value={data.OWNER_ADDRESS}
                />
              </PropertyTable>
              <PropertyTable>
                <PropertyRow label="Buyers" value={data.BUYER} />
                <PropertyRow
                  label="Buyer's Primary Address"
                  value={data.BUYER_ADDRESS}
                />
              </PropertyTable>
            </TwoColumnWrapper>
          </section>
          <TwoColumnWrapper>
            {data.APPRAISALS && data.APPRAISALS.length > 0 && (
              <section>
                <SectionHeader title="Appraisal Information" />

                <DataTable
                  headers={[
                    { label: 'Year' },
                    { label: 'Land Value', right: true },
                    { label: 'Building Value', right: true },
                    { label: 'Total Appraisal', right: true },
                  ]}
                >
                  {data.APPRAISALS.map((appraisal, idx) => (
                    <DataTableRow
                      key={idx}
                      cells={[
                        { value: appraisal.YEAR_ID },
                        {
                          value: formatCurrency(appraisal.LAND_APR),
                          right: true,
                        },
                        {
                          value: formatCurrency(appraisal.BLDG_APR),
                          right: true,
                        },
                        {
                          value: formatCurrency(appraisal.TOTAL_APR),
                          right: true,
                        },
                      ]}
                      isLast={idx === data.APPRAISALS.length - 1}
                    />
                  ))}
                </DataTable>
              </section>
            )}

            {data.ASSESSMENTS && data.ASSESSMENTS.length > 0 && (
              <section>
                <SectionHeader title="Assessments" />
                <DataTable
                  headers={[
                    { label: 'Year' },
                    { label: 'Land Assessed', right: true },
                    { label: 'Building Assessed', right: true },
                    {
                      label: (
                        <>
                          Total Assessed
                          <a
                            href="#footnote-1"
                            id="footnote-ref-1"
                            aria-label="see footnote 1"
                            className="ml-1 text-white group-target:text-black"
                          >
                            <sup>1</sup>
                          </a>
                        </>
                      ),
                      right: true,
                    },
                  ]}
                >
                  {data.ASSESSMENTS.map((assessment, idx) => (
                    <DataTableRow
                      key={idx}
                      cells={[
                        { value: assessment.YEAR_ID },
                        {
                          value: formatCurrency(assessment.LAND_ASM),
                          right: true,
                        },
                        {
                          value: formatCurrency(assessment.BLDG_ASM),
                          right: true,
                        },
                        {
                          value: formatCurrency(assessment.TOTAL_ASM),
                          right: true,
                        },
                      ]}
                      isLast={idx === data.ASSESSMENTS.length - 1}
                    />
                  ))}
                </DataTable>
              </section>
            )}
          </TwoColumnWrapper>
          {data.STRUCTURES && data.STRUCTURES.length > 0 && (
            <section>
              <details>
                <summary className="cursor-pointer">
                  View Building Details
                </summary>
                {data.STRUCTURES.map((structure, idx) => (
                  <section key={idx}>
                    <SectionHeader
                      title={`Structure #${idx + 1} of ${data.STRUCTURES.length}`}
                    />
                    <TwoColumnWrapper>
                      <PropertyTable>
                        <PropertyRow
                          label="Residential Units"
                          value={structure.RES_UNITS}
                        />
                        <PropertyRow
                          label="Condition"
                          value={structure.CONDITION}
                        />
                        <PropertyRow
                          label="Basement"
                          value={structure.BASEMENT}
                        />
                        <PropertyRow
                          label="Year Built"
                          value={structure.YEAR_BUILT}
                        />
                        <PropertyRow
                          label="Foundation"
                          value={structure.FOUNDATION}
                        />
                        <PropertyRow
                          label="Septic"
                          value={structure.SEPTIC}
                          isLast
                        />
                      </PropertyTable>
                      <PropertyTable>
                        <PropertyRow label="Use" value={structure.USE} />
                        <PropertyRow label="Design" value={structure.DESIGN} />
                        <PropertyRow
                          label="Construction Type"
                          value={structure.CONST_TYPE}
                        />
                        <PropertyRow label="Grade" value={structure.GRADE} />
                        <PropertyRow label="Well" value={structure.WELL} />
                      </PropertyTable>
                    </TwoColumnWrapper>
                  </section>
                ))}

                {data.BUILDING_DETAILS?.length > 0 && (
                  <section>
                    <SectionHeader title="Building Detail Information" />
                    <DataTable
                      headers={[
                        { label: 'Building Number' },
                        { label: 'Building Detail Description' },
                        { label: 'Area', right: true },
                        { label: 'Percent Complete', right: true },
                      ]}
                    >
                      {data.BUILDING_DETAILS?.map((detail, detailIdx) => (
                        <DataTableRow
                          key={detailIdx}
                          cells={[
                            { value: detail.ITM_BLDGID },
                            { value: detail.ITM_DESC },
                            {
                              value: `${detail.ITM_AREA} Sq. Ft.`,
                              right: true,
                            },
                            { value: `${detail.ITM_DONE}%`, right: true },
                          ]}
                        />
                      ))}
                    </DataTable>
                  </section>
                )}
              </details>
            </section>
          )}

          <div className="grid grid-cols-1 gap-1 md:grid-cols-12 print:grid-cols-12">
            {data.TAX_BILLING && data.TAX_BILLING.length > 0 && (
              <section className="col-span-4">
                <SectionHeader title="Tax/Billing Information" />
                <DataTable
                  headers={[
                    { label: 'Year' },
                    { label: 'Certified' },
                    { label: 'Zone' },
                    { label: 'Mill', right: true },
                    { label: 'Tax Billed', right: true },
                  ]}
                >
                  {data.TAX_BILLING.map((billing, idx) => (
                    <DataTableRow
                      key={idx}
                      cells={[
                        { value: billing.YEAR_ID },
                        { value: billing.YEAR_CERT },
                        { value: billing.ZONE },
                        { value: billing.MILL, right: true },
                        { value: billing.TAX_BILLED, right: true },
                      ]}
                      isLast={idx === data.TAX_BILLING.length - 1}
                    />
                  ))}
                </DataTable>
              </section>
            )}

            {data.RECORDED_DOCUMENTS && data.RECORDED_DOCUMENTS.length > 0 && (
              <section className="col-span-8">
                <SectionHeader title="Recorded Documents" />
                <DataTable
                  headers={[
                    { label: 'Date' },
                    { label: 'Type' },
                    { label: 'Recording Info (offsite link to DNR)' },
                  ]}
                >
                  {data.RECORDED_DOCUMENTS.map((doc, idx) => (
                    <DataTableRow
                      key={idx}
                      cells={[
                        { value: formatDate(doc.DEED_DATE || null) },
                        { value: doc.DEED_TYPE },
                        {
                          value: (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://dnr.alaska.gov/ssd/recoff/search/cad_search?District=${doc.districtCode}${doc.DOC_URL}`}
                            >
                              {doc.DOC_LABEL}
                            </a>
                          ),
                        },
                      ]}
                      isLast={idx === data.RECORDED_DOCUMENTS.length - 1}
                    />
                  ))}
                </DataTable>
              </section>
            )}
          </div>
          <section>
            <SectionHeader
              title={
                <>
                  Tax Account Status{' '}
                  <a
                    href="#footnote-2"
                    id="footnote-ref-2"
                    aria-label="see footnote 2"
                  >
                    <sup>2</sup>
                  </a>
                </>
              }
            />
            <DataTable
              headers={[
                { label: 'Status' },
                { label: 'Tax Balance' },
                { label: 'Farm' },
                { label: 'Disabled Veteran' },
                { label: 'Senior' },
                {
                  label: (
                    <>
                      Total{' '}
                      <a
                        href="#footnote-3"
                        id="footnote-ref-3"
                        aria-label="See footnote 3"
                        className="text-white"
                      >
                        <sup>3</sup>
                      </a>
                    </>
                  ),
                },
                { label: 'LID Exists' },
              ]}
            >
              <DataTableRow
                cells={[
                  { value: data.STATUS },
                  { value: formatCurrency(data.BALANCE) },
                  { value: formatCurrency(data.FARM_DEFERMENT) },
                  { value: formatCurrency(data.DISABLED_VET) },
                  { value: formatCurrency(data.SENIOR) },
                  { value: formatCurrency(data.TOTAL) },
                  { value: data.LID },
                ]}
                isLast
              />
            </DataTable>
          </section>
          <section>
            <SectionHeader title="Land and Miscellaneous" />
            <DataTable
              headers={[
                {
                  label: 'Gross Acreage',
                },
                {
                  label: 'Taxable Acreage',
                },
                {
                  label: 'Assembly District',
                },
                {
                  label: 'Precinct',
                },
                {
                  label: 'Fire Service Area',
                },
                {
                  label: 'Road Service Area',
                },
              ]}
            >
              <DataTableRow
                cells={[
                  { value: data.GROSS_ACRE },
                  {
                    value: data.NET_ACRE,
                  },
                  {
                    value: data.DISTRICT,
                  },
                  {
                    value: (
                      <a href="https://www.matsugov.us/maps/polling-places-and-precincts">
                        {data.PRECINCT}
                      </a>
                    ),
                  },
                  {
                    value: data.FIRE_AREA,
                  },
                  {
                    value:
                      data.ROAD_AREA && data.ROAD_AREA.includes('<a ') ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: data.ROAD_AREA }}
                        />
                      ) : (
                        data.ROAD_AREA
                      ),
                  },
                ]}
              />
            </DataTable>
          </section>
          <ol className="mt-4 space-y-1 text-xs print:text-[10px]">
            <li
              id="footnote-1"
              className="transition-colors target:bg-yellow-200"
            >
              <a
                href="#footnote-ref-1"
                aria-label="back to reference"
                className="mr-2"
              >
                <sup>1</sup>
              </a>
              Total Assessed is net of exemptions and deferments.rest,
              penalties, and other charges posted after Last Update Date are not
              reflected in balances.
            </li>
            <li
              id="footnote-2"
              className="focus-ring transition-colors target:bg-yellow-200"
            >
              <a
                href="#footnote-ref-2"
                aria-label="back to reference"
                className="mr-2"
              >
                <sup>2</sup>
              </a>
              If account is in foreclosure, payment must be in certified funds.
            </li>
            <li
              id="footnote-3"
              className="focus-ring transition-colors target:bg-yellow-200"
            >
              <a
                href="#footnote-ref-3"
                aria-label="back to reference"
                className="mr-2"
              >
                <sup>3</sup>
              </a>
              If you reside within the city limits of Palmer or Houston, your
              exemption amount may be different.
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}

function TwoColumnWrapper(props: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 print:grid-cols-2">
      {props.children}
    </div>
  );
}
