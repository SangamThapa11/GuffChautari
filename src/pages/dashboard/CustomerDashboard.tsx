import { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreVertical, 
  Send,
  Bookmark,
  Smile
} from 'lucide-react';

interface Post {
  id: number;
  username: string;
  userAvatar: string;
  postTime: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

const CustomerDashboard = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: 'john_doe',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      postTime: '2 hours ago',
      content: 'Just launched my new website! 🚀 Super excited to share this project I\'ve been working on for months. The tech stack includes React, TypeScript, and Node.js! #webdev #react #typescript',
      likes: 245,
      comments: 42,
      shares: 18,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 2,
      username: 'sarah_tech',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      postTime: '5 hours ago',
      content: 'Learning GraphQL has been a game-changer for our API development. The flexibility and efficiency improvements are incredible! Any GraphQL tips to share? 👇',
      likes: 189,
      comments: 36,
      shares: 9,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: 3,
      username: 'dev_guru',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guru',
      postTime: '1 day ago',
      content: 'Just completed a full-stack project with React, Express, and MongoDB. The journey from design to deployment taught me so much! Check out the live demo in comments.',
      likes: 312,
      comments: 67,
      shares: 24,
      isLiked: false,
      isBookmarked: false,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const wasLiked = post.isLiked;
        return {
          ...post,
          likes: wasLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !wasLiked
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const newPostObj: Post = {
      id: posts.length + 1,
      username: 'current_user',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      postTime: 'Just now',
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false,
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Create Post Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser" 
              alt="Your avatar"
              className="w-12 h-12 rounded-full border-2 border-teal-100"
            />
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full border-0 focus:ring-0 text-gray-700 placeholder-gray-400 resize-none min-h-20"
                rows={3}
              />
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-teal-500 transition">
                    <Smile size={20} />
                    <span className="text-sm">Emoji</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-teal-500 transition">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Photo/Video</span>
                  </button>
                </div>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Post Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.userAvatar} 
                      alt={post.username}
                      className="w-10 h-10 rounded-full border"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{post.username}</h3>
                      <span className="text-sm text-gray-500">{post.postTime}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
              </div>

              {/* Post Stats */}
              <div className="px-6 py-3 border-t border-b border-gray-100">
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Heart size={16} className="fill-red-500 text-red-500" />
                    <span>{post.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    <span>{post.comments} comments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 size={16} />
                    <span>{post.shares} shares</span>
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg transition ${
                      post.isLiked 
                        ? 'text-red-500 bg-red-50' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart size={20} className={post.isLiked ? 'fill-red-500' : ''} />
                    <span className="font-medium">Like</span>
                  </button>
                  
                  <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                    <MessageCircle size={20} />
                    <span className="font-medium">Comment</span>
                  </button>
                  
                  <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                    <Share2 size={20} />
                    <span className="font-medium">Share</span>
                  </button>
                  
                  <button
                    onClick={() => handleBookmark(post.id)}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg transition ${
                      post.isBookmarked 
                        ? 'text-teal-500 bg-teal-50' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Bookmark size={20} className={post.isBookmarked ? 'fill-teal-500' : ''} />
                    <span className="font-medium">Save</span>
                  </button>
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Commenter" 
                    alt="Commenter"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 flex items-center bg-gray-50 rounded-full px-4 py-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="flex-1 bg-transparent border-0 focus:ring-0 text-sm"
                    />
                    <button className="text-gray-400 hover:text-teal-500">
                      <Smile size={18} />
                    </button>
                    <button className="ml-2 text-gray-400 hover:text-teal-500">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Stats (Optional) */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Dashboard Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-teal-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">{posts.length}</div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {posts.reduce((sum, post) => sum + post.likes, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {posts.reduce((sum, post) => sum + post.comments, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Comments</div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">
                {posts.reduce((sum, post) => sum + post.shares, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Shares</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;