using System.Threading.Tasks;

namespace Mission11_Lane.Models
{
    public interface IBookRepository
    {
        Task<BookPageResult> GetBooksAsync(
            int page,
            int pageSize,
            string? sort,
            List<string>? categories);

        Task<List<string>> GetCategoriesAsync();

        Task<Book?> GetBookByIdAsync(int bookId);

        Task<Book> AddBookAsync(Book book);

        Task<Book?> UpdateBookAsync(int bookId, Book book);

        Task<bool> DeleteBookAsync(int bookId);
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

