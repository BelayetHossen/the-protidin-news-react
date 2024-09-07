<?php

namespace App\Http\Controllers\frontend;

use App\Models\Post;
use App\Models\User;
use App\Models\Video;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    // header Categories
    function headerCategories()
    {
        $first13Categories = Category::where('status',true)->take(12)->get();
        $skip13NextCategories = Category::where('status',true)->skip(12)->take(50)->get();
        return response()->json([
            'first13Categories' => $first13Categories,
            'skip13NextCategories' => $skip13NextCategories,
            'code'  => 201
        ]);
    }
    // home Categories
    function homeCategories()
    {
        $homeCategories = Category::where('show_home', true)->where('status',true)->get();
        return response()->json([
            'homeCategories' => $homeCategories,
            'code'  => 201
        ]);
    }
    // home Category Post
    function homeCategoryPost($id)
    {
        $homeCategoryFirstPost = Post::where('category_id', $id)->where('status',true)->latest()->first();
        $homeCategory4Post = Post::where('category_id', $id)->where('status',true)->latest()->skip(1)->take(4)->get();
        return response()->json([
            'homeCategoryFirstPost' => $homeCategoryFirstPost,
            'homeCategory4Post' => $homeCategory4Post,
            'code'  => 201
        ]);
    }
    // increase populer post count by click user
    public function clickPost($id){
        $post = Post::findOrFail($id);
        $post->increment('popular_count');
        return response()->json(['message' => 'Popular count incremented successfully'], 200);
    }

    // home post
    function homePost() {
        $allPosts = Post::latest()->get();
        $activePosts = Post::where('status',true)->latest()->get();
        $inactivePosts = Post::where('status',false)->latest()->get();
        $Categories = Category::with('subCategory')->get();
        $latestOne = Post::where('status',true)->latest()->first();
        $nextFourPosts = Post::where('status',true)->latest()->skip(1)->take(4)->get();
        $nextSixPosts = Post::where('status',true)->latest()->skip(5)->take(6)->get();
        $popularFourPosts = Post::where('status',true)->orderBy('popular_count', 'desc')->take(4)->get();
        $isHeadline = Post::where('is_headline', true)->where('status',true)->take(10)->get();
        $homeVideos = Video::where('status',true)->latest()->take(6)->get();
        $allVideos = Video::where('status',true)->latest()->take(6)->get();
        $admins = User::with('getRole')->get();
        return response()->json([
            'allPosts' => $allPosts,
            'activePosts' => $activePosts,
            'inactivePosts' => $inactivePosts,
            'Categories' => $Categories,
            'latestOne' => $latestOne,
            'nextFourPosts' => $nextFourPosts,
            'nextSixPosts' => $nextSixPosts,
            'popularFourPosts' => $popularFourPosts,
            'isHeadline' => $isHeadline,
            'homeVideos' => $homeVideos,
            'allVideos' => $allVideos,
            'admins' => $admins,
            'code'  => 201
        ]);
    }

    // video Post
    function videoPost() {
        $videoPost = Video::where('status',true)->latest()->paginate(6);
        return response()->json([
            'videoPost' => $videoPost,
            'code'  => 201
        ]);
    }



    // single post page
    public function getSinglePost($slug){
        $post = Post::where('slug', $slug)
                ->with('mainCategory', 'subCategory', 'subSubCategory')
                ->firstOrFail();

        // Retrieve more posts with the same main category
        $mainCategoryId = $post->mainCategory->id;
        $moreSixPosts = Post::whereHas('mainCategory', function ($query) use ($mainCategoryId) {
                            $query->where('id', $mainCategoryId);
                    })
                    ->orderBy('created_at', 'desc')
                    ->where('status',true)
                    ->latest()
                    ->skip(1)
                    ->take(6)
                    ->get();

        return response()->json([
            'post' => $post,
            'moreSixPosts' => $moreSixPosts,
            'code' => 201
        ]);
    }

    // get posts by category
    public function getPostsByCategory($slug)
    {
        $category = Category::where('slug', $slug)->first();

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $posts = Post::where('category_id', $category->id)->where('status',true)->latest()->paginate(15);

        $latestOne = Post::where('category_id', $category->id)->where('status',true)->latest()->first();
        $nextFourPosts = Post::where('category_id', $category->id)->where('status',true)->latest()->skip(1)->take(4)->get();
        $nextSixPosts = Post::where('category_id', $category->id)->where('status',true)->latest()->skip(5)->take(6)->get();
        return response()->json([
            'posts' => $posts,
            'latestOne' => $latestOne,
            'nextFourPosts' => $nextFourPosts,
            'nextSixPosts' => $nextSixPosts,
            'category' => $category,
            'code'  => 201
        ]);

    }

    public function searchByTitle(Request $request)
    {
        $title = $request->title;

        // Validate the title input
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // Perform the search query
        $searchPosts = Post::where('title', 'like', '%' . $title . '%')->where('status',true)->latest()->get();

        return response()->json([
            'post' => $searchPosts,
            'code' => 201
        ]);
    }


}
