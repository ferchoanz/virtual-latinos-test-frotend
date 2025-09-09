import React, { useEffect } from "react";
import { usePosts } from "~/context/PostContext";

interface ApplicantsTableProps {
  id: number;
}

export function ApplicantsTable({ id }: ApplicantsTableProps) {
  const {currentApplicants, loadApplicants} = usePosts();

  useEffect(() => {
    (async() => {
      await loadApplicants(id);
    })();
  },[]);


  return (
    <div className="card w-full shadow-xl bg-base-200 mt-6">
      <div className="card-body">
        <h3 className="card-title text-xl font-bold mb-4">Aplicantes</h3>
        <div className="overflow-x-auto">
          <table className="table table-sm w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Profession</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {currentApplicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td>{applicant.name}</td>
                  <td>{applicant.profession}</td>
                  <td>${applicant.rate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
