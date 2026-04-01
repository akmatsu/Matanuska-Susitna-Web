import { ParcelDetails } from '@/app/(backend)/api/v1/parcels/mockParcels';
import {
  SectionHeader,
  PropertyRow,
  PropertyTable,
  DataTable,
  DataTableRow,
  LabelDataRow,
} from './components';

export async function ParcelDetail(props: {
  params: PageProps<'/parcels/[pid]'>['params'];
}) {
  const { pid } = await props.params;

  async function fetchParcelDetails(parcelId: string): Promise<ParcelDetails> {
    const res = await fetch(`http://localhost:3002/api/v1/parcels/${parcelId}`);
    if (!res.ok)
      throw new Error('Failed to fetch parcel details: ' + res.status);

    return res.json();
  }

  const data = await fetchParcelDetails(pid);

  const formatCurrency = (value: number | null) => {
    if (!value) return '--';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="space-y-4 bg-white p-4 font-sans text-sm">
      {/* Header */}
      <div className="border-table-border border-b pb-4">
        <h1 className="font-bold text-white">
          Real Property Detail for Account: {data.TAX_ID}
        </h1>
      </div>

      {/* Row 1: Overview + Exemptions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Overview Section */}
        <div>
          <SectionHeader title="Site Information" />
          <PropertyTable>
            <PropertyRow label="Account Number" value={data.TAX_ID} />
            <PropertyRow label="Parcel ID" value={data.PARCEL_ID} />
            <PropertyRow label="Address" value={data.CITE_ADDRESS} />
            <PropertyRow label="Owner" value={data.OWNER} />
            <PropertyRow
              label="Owner Address"
              value={<span className="text-xs">{data.OWNER_ADDRESS}</span>}
            />
            <PropertyRow label="Status" value={data.STATUS} />
            <PropertyRow
              label="Last Updated"
              value={formatDate(data.LAST_UPDATED)}
              isLast
            />
          </PropertyTable>
        </div>

        {/* Exemptions Section */}
        <div>
          <SectionHeader title="Exemptions & Tax Info" />
          <PropertyTable>
            <PropertyRow
              label="Farm Deferment"
              value={data.FARM_DEFERMENT ? 'Yes' : 'No'}
            />
            <PropertyRow
              label="Disabled Veteran"
              value={data.DISABLED_VET ? 'Yes' : 'No'}
            />
            <PropertyRow
              label="Senior Exemption"
              value={data.SENIOR ? 'Yes' : 'No'}
            />
            <PropertyRow label="LID" value={data.LID} />
            <PropertyRow label="Precinct" value={data.PRECINCT} />
            <PropertyRow label="District" value={data.DISTRICT} isLast />
          </PropertyTable>
        </div>
      </div>

      {/* Property Details - Full Width 2-column table */}
      <div>
        <SectionHeader title="Property Information" />
        <div className="overflow-x-auto">
          <table className="border-table-border w-full border">
            <tbody>
              <LabelDataRow
                label1="TRS"
                data1={data.TRS}
                label2="Legal Description"
                data2={data.LEGAL_DESC}
                nowrap1
              />
              <LabelDataRow
                label1="Subdivision"
                data1={data.SUBD_NAME}
                label2="Map References"
                data2={`${data.MAP}, ${data.MAP2}`}
                nowrap1
              />
              <LabelDataRow
                label1="Gross Acres"
                data1={data.GROSS_ACRE}
                label2="Net Acres"
                data2={data.NET_ACRE}
                nowrap1
              />
              <LabelDataRow
                label1="Fire Area"
                data1={data.FIRE_AREA}
                label2="Road Area"
                data2={data.ROAD_AREA}
                isLast
                nowrap1
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* Structures Section */}
      {data.STRUCTURES && data.STRUCTURES.length > 0 && (
        <div>
          <SectionHeader title="Structures" />
          {data.STRUCTURES.map((structure, idx) => (
            <PropertyTable key={idx}>
              <PropertyRow label="Building #" value={structure.BLDG_NBR} />
              <PropertyRow label="Use" value={structure.USE} />
              <PropertyRow label="Design" value={structure.DESIGN} />
              <PropertyRow label="Condition" value={structure.CONDITION} />
              <PropertyRow label="Year Built" value={structure.YEAR_BUILT} />
              <PropertyRow
                label="Construction Type"
                value={structure.CONST_TYPE}
              />
              <PropertyRow label="Foundation" value={structure.FOUNDATION} />
              <PropertyRow label="Grade" value={structure.GRADE} />
              <PropertyRow label="Basement" value={structure.BASEMENT} isLast />
            </PropertyTable>
          ))}
        </div>
      )}

      {/* Row 2: Appraisals + Tax Billing */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Appraisals Section */}
        {data.APPRAISALS && data.APPRAISALS.length > 0 && (
          <div>
            <SectionHeader title="Appraisals" />
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
                    { value: formatCurrency(appraisal.LAND_APR), right: true },
                    { value: formatCurrency(appraisal.BLDG_APR), right: true },
                    {
                      value: formatCurrency(appraisal.TOTAL_APR),
                      right: true,
                      bold: true,
                    },
                  ]}
                  isLast={idx === data.APPRAISALS.length - 1}
                />
              ))}
            </DataTable>
          </div>
        )}

        {/* Tax Billing Section */}
        {data.TAX_BILLING && data.TAX_BILLING.length > 0 && (
          <div>
            <SectionHeader title="Tax Billing" />
            <DataTable
              headers={[
                { label: 'Year' },
                { label: 'Certified' },
                { label: 'Zone' },
                { label: 'Mill Rate', right: true },
                { label: 'Amount Billed', right: true },
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
                    { value: billing['Tax Amount Billed'], right: true },
                  ]}
                  isLast={idx === data.TAX_BILLING.length - 1}
                />
              ))}
            </DataTable>
          </div>
        )}
      </div>

      {/* Recorded Documents Section */}
      {data.RECORDED_DOCUMENTS && data.RECORDED_DOCUMENTS.length > 0 && (
        <div>
          <SectionHeader title="Recorded Documents" />
          <DataTable
            headers={[
              { label: 'Date' },
              { label: 'Type' },
              { label: 'Label' },
              { label: 'Link' },
            ]}
          >
            {data.RECORDED_DOCUMENTS.map((doc, idx) => (
              <DataTableRow
                key={idx}
                cells={[
                  { value: formatDate(doc.DEED_DATE) },
                  { value: doc.DEED_TYPE },
                  { value: doc.DOC_LABEL },
                  {
                    value: (
                      <a
                        href={`#${doc.DOC_URL}`}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        View
                      </a>
                    ),
                  },
                ]}
                isLast={idx === data.RECORDED_DOCUMENTS.length - 1}
              />
            ))}
          </DataTable>
        </div>
      )}
    </div>
  );
}
