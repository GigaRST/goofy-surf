import React, { ReactNode } from "react";

interface TableProps {
  headers: ReactNode; // Le intestazioni della tabella saranno passate come children (<th />)
  children: ReactNode; // Le righe della tabella (<tr />) saranno passate come children
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>{headers}</tr> {/* Intestazioni passate come children */}
        </thead>
        <tbody>{children}</tbody> {/* Righe passate come children */}
      </table>
    </div>
  );
};

export default Table;
