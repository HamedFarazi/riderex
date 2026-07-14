import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  User,
  Eye,
  Tag,
  Share2,
  Heart,
  ArrowLeft,
  Clock,
} from "lucide-react";

function BlogPostPage() {
  const { id } = useParams();

  // Mock blog post data
  const post = {
    id: id || "1",
    title: "راهنمای انتخاب روغن موتور مناسب",
    content: `
      <p>انتخاب روغن موتور مناسب تاثیر مستقیم بر کارایی و طول عمر قطعات موتور دارد. در این مقاله نکات عملی برای انتخاب روغن مناسب برای انواع موتور ارائه شده است.</p>

      <h2>۱. انواع روغن‌ها و گرانروی</h2>
      <p>روغن‌ها بر اساس گرانروی و استانداردهای تولید طبقه‌بندی می‌شوند؛ انتخاب گرانروی مناسب بر اساس توصیه سازنده موتور انجام شود.</p>

      <h2>۲. روغن‌های سنتتیک و معدنی</h2>
      <p>روغن‌های سنتتیک عملکرد بهتری در دماهای بالا دارند و عمر قطعات را افزایش می‌دهند.</p>

      <h2>۳. زمان تعویض روغن</h2>
      <p>تعویض روغن بر اساس کارکرد و شرایط رانندگی تعیین می‌شود؛ بررسی دوره‌ای سطح روغن و فیلتر فراموش نشود.</p>

      <h2>نتیجه‌گیری</h2>
      <p>با توجه به نیاز موتور و توصیه‌های تولیدکننده، روغن مناسب را انتخاب کنید و در صورت نیاز از مشاوره فنی تیم ما بهره ببرید.</p>
    `,
    author: "تیم فنی",
    authorBio: "تکنسین ارشد تعمیرات موتور",
    authorImage: "/images/pexels-photo-1043471.jpeg",
    date: "۱۴۰۳/۰۸/۲۰",
    readTime: "۵ دقیقه",
    views: 1234,
    category: "نگهداری",
    tags: ["روغن", "نگهداری", "محصول"],
    image: "/images/pexels-photo-11035380.jpeg",
  };

  const relatedPosts = [
    {
      id: "2",
      title: "اصول طراحی UI/UX که هر طراح باید بداند",
      image: "./images/pexels-photo-196644.jpeg",
      author: "مریم احمدی",
      date: "۱۴۰۳/۰۸/۱۸",
    },
    {
      id: "4",
      title: "هوش مصنوعی و تاثیر آن بر آموزش آنلاین",
      image: "./images/pexels-photo-8386440.jpeg",
      author: "سارا میرزایی",
      date: "۱۴۰۳/۰۸/۱۲",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rtl">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-purple-400">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-purple-400">
          وبلاگ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">مقاله</span>
      </nav>

      {/* Article Header */}
      <article className="glass rounded-xl overflow-hidden mb-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="p-8">
          <div className="mb-6">
            <span className="bg-purple-500 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center space-x-3 space-x-reverse">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-sm text-gray-400">{post.authorBio}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Eye className="h-4 w-4" />
                <span>{post.views.toLocaleString("fa")}</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              direction: "rtl",
              textAlign: "right",
            }}
          />

          {/* Tags */}
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <Tag className="h-5 w-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Social Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="flex items-center space-x-2 space-x-reverse text-gray-400 hover:text-red-400 transition-colors">
                <Heart className="h-5 w-5" />
                <span>پسندیدن</span>
              </button>
              <button className="flex items-center space-x-2 space-x-reverse text-gray-400 hover:text-purple-400 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>اشتراک‌گذاری</span>
              </button>
            </div>
            <Link
              to="/blog"
              className="flex items-center space-x-2 space-x-reverse text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>بازگشت به وبلاگ</span>
            </Link>
          </div>
          {/* End Social Actions */}
        </div>
      </article>
      {/* End Article Header */}

      {/* Comments Section */}
      <div className="glass rounded-xl p-6 mt-10 mb-10">
        <h2 className="text-xl font-semibold mb-6">نظرات مشتریان</h2>
        {/* Mock Comments */}
        <div className="space-y-6 mb-8">
          <div className="flex items-start space-x-4 space-x-reverse">
            <img
              src="./images/32.jpg"
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="font-medium">علی محمدی</span>
                <span className="text-xs text-gray-400 mr-2">۲ روز پیش</span>
              </div>
              <div className="text-gray-300 text-sm">
                مقاله بسیار مفیدی بود، ممنون از توضیحات کاملتون!
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-4 space-x-reverse">
            <img
              src="./images/44.jpg"
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="font-medium">زهرا احمدی</span>
                <span className="text-xs text-gray-400 mr-2">۱ روز پیش</span>
              </div>
              <div className="text-gray-300 text-sm">
                خیلی عالی بود، لطفاً درباره Web3 بیشتر بنویسید.
              </div>
            </div>
          </div>
        </div>
        {/* Comment Form */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="comment"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              نظر خود را بنویسید
            </label>
            <textarea
              id="comment"
              rows={3}
              className="w-full rounded-md bg-white/5 border border-white/10 text-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="نظر شما..."
            ></textarea>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 md:space-x-reverse space-y-4 md:space-y-0">
            <input
              type="text"
              className="flex-1 rounded-md bg-white/5 border border-white/10 text-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="نام شما"
            />
            <input
              type="email"
              className="flex-1 rounded-md bg-white/5 border border-white/10 text-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="ایمیل (اختیاری)"
            />
          </div>
          <button
            type="submit"
            className="glow-button px-6 py-2 rounded-md text-sm font-medium text-white"
          >
            ارسال نظر
          </button>
        </form>
      </div>
      {/* End Comments Section */}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">مقالات مرتبط</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                className="flex items-center space-x-4 space-x-reverse p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-20 h-14 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium line-clamp-2 mb-1">
                    {relatedPost.title}
                  </h3>
                  <div className="text-sm text-gray-400">
                    {relatedPost.author} • {relatedPost.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPostPage;
