import { LabelCell } from './LabelCell';
import { DataCell } from './DataCell';

export const LabelDataRow = ({
  label1,
  data1,
  label2,
  data2,
  isLast = false,
  nowrap1 = false,
  nowrap2 = false,
}: {
  label1: React.ReactNode;
  data1: React.ReactNode;
  label2: React.ReactNode;
  data2: React.ReactNode;
  isLast?: boolean;
  nowrap1?: boolean;
  nowrap2?: boolean;
}) => (
  <tr className={!isLast ? 'border-table-border border-b' : ''}>
    <LabelCell>{label1}</LabelCell>
    <DataCell nowrap={nowrap1}>{data1}</DataCell>
    <LabelCell noWidth>{label2}</LabelCell>
    <DataCell isLast nowrap={nowrap2}>
      {data2}
    </DataCell>
  </tr>
);
