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

        public async Task<BookPageResult> GetBooksAsync(
            int page,
            int pageSize,
            string? sort,
            List<string>? categories)
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

            if (categories != null && categories.Count > 0)
            {
                query = query.Where(b => categories.Contains(b.Category));
            }

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

            if (totalPages < 1)
            {
                totalPages = 1;
            }

            if (page > totalPages)
            {
                page = totalPages;
            }

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

        public async Task<List<string>> GetCategoriesAsync()
        {
            return await _context.Books
                .AsNoTracking()
                .Select(b => b.Category)
                .Distinct()
                .OrderBy(c => c)
                .ToListAsync();
        }
    }
}

