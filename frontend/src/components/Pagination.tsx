export default function Pagination({
    page,
    totalPages,
    setPage,
    pageNumbers,
    totalItems
}: {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
    pageNumbers: number[];
    totalItems: number;
}) {
    return (
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-3">
            <div className="text-muted">
                Page {page} of {totalPages} ({totalItems} total items)
            </div>
            <nav aria-label="Book pages">
                <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                        <button
                        className="page-link"
                        onClick={() => setPage(Math.max(1, page - 1))}
                        >
                        Previous
                        </button>
                    </li>

                    {pageNumbers.map((p) => (
                        <li
                        key={p}
                        className={`page-item ${p === page ? 'active' : ''}`}
                        >
                        <button
                            className="page-link"
                            onClick={() => setPage(p)}
                        >
                            {p}
                        </button>
                        </li>
                    ))}

                    <li
                        className={`page-item ${
                        page >= totalPages ? 'disabled' : ''
                        }`}
                    >
                        <button
                        className="page-link"
                        onClick={() =>
                            setPage(Math.min(totalPages, page + 1))
                        }
                        >
                        Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}