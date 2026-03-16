using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11_Lane.Models;

namespace Mission11_Lane.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public BooksController(BookstoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks(
            int page = 1,
            int pageSize = 5,
            string? sort = null)
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

            // Keep ordering deterministic for paging.
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

            return Ok(new
            {
                items,
                page,
                pageSize,
                totalItems,
                totalPages,
            });
        }
    }
}

