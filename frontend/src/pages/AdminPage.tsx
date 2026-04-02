import { Link } from "react-router-dom";
import AdminList from "../components/AdminList";

export default function AdminPage() {
    return (
        <div className="container">
            <header className="border-bottom border-secondary-subtle py-4 mb-3">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <h1 className="display-5 fw-semibold mb-0 text-body-emphasis">
                        Book Store
                    </h1>
                    <div className="d-flex align-items-center gap-2 flex-shrink-0">
                        <Link to="/books" className="btn btn-secondary text-white text-nowrap">
                            Store Page
                        </Link>
                    </div>
                </div>
            </header>
            <h1 className="h3 m-0 text-nowrap">Admin Page</h1>
            <AdminList />
        </div>
    );
}