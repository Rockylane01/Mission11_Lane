using System.Threading.Tasks;

namespace Mission11_Lane.Models
{
    public interface IBookRepository
    {
        Task<BookPageResult> GetBooksAsync(int page, int pageSize, string? sort);
    }

    public class BookPageResult
    {
        public required IEnumerable<Book> Items { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }
}

