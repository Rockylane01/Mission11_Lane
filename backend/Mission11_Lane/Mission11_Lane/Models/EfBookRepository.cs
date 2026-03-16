using Microsoft.EntityFrameworkCore;

namespace Mission11_Lane.Models
{
    public class EfBookRepository : IBookRepository
    {
        private readonly BookstoreContext _context;

        public EfBookRepository(BookstoreContext context)
        {
            _context = context;
        }

        public async Task<BookPageResult> GetBooksAsync(int page, int pageSize, string? sort)
        {
            if (page < 1)
            {
                page = 1;
            }

            if (pageSize < 1)
            {
                pageSize = 5;
            }

            IQueryable<Book> query = _context.Books.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(sort) && sort.Equals("title", StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderBy(b => b.Title).ThenBy(b => b.BookID);
            }
            else
            {
                query = query.OrderBy(b => b.BookID);
            }

            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new BookPageResult
            {
                Items = items,
                Page = page,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
            };
        }
    }
}

