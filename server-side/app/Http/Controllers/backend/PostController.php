<?php

namespace App\Http\Controllers\backend;

use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    // all post
    function allPosts() {
        $posts = Post::with('mainCategory')->with('subCategory')->with('subSubCategory')->get();
        return response()->json([
            'posts' => $posts,
            'code'  => 201
        ]);
    }
    // single post
    function postGet($id) {
        $post = Post::with('mainCategory')->with('subCategory')->with('subSubCategory')->find($id);
        return response()->json([
            'post' => $post,
            'code'  => 201
        ]);
    }

    // post store
    public function postStore(Request $request)
    {

        $exist_title = Post::where('title', $request->title)->first();
        if (!empty($exist_title)) {
            return response()->json([
                'message' => 'The title already exists',
                'code'  => 422
            ]);
        }


        if (empty($exist_title)) {
            $data = new Post();
            $data->title = $request->title;
            $data->slug = Str::slug($request->title);
            $data->description = $request->description;
            $data->meta_title = $request->meta_title;
            $data->meta_description = $request->meta_description;
            $data->category_id = $request->category_id;
            $data->sub_category_id = $request->sub_category_id;
            $data->sub_sub_category_id = $request->sub_sub_category_id;
            $data->tags = json_encode($request->tags);
            $data->is_headline = filter_var($request->is_headline, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false;

            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $imageName = time().'.'.$image->getClientOriginalExtension();
                $image->move(base_path('images/posts'), $imageName);
                $data->photo = $imageName;
            } else {
                $imageName = '';
            }
            $data->save();
            return response()->json([
                'message' => 'New post saved successfully',
                'code'  => 201
            ]);
        }
    }

    // post update
    public function postUpdate(Request $request)
    {
        $data = Post::find($request->id);
        if ($request->title != $data->title) {
            $exist_title = Post::where('title', $request->title)->first();
        } else {
            $exist_title = '';
        }

        if (!empty($exist_title)) {
            return response()->json([
                'message' => 'The title exists'.' '.$request->title,
                'code'  => 422
            ]);
        }

        $imageName = $request->old_photo;
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(base_path('images/posts'), $imageName);

            // Delete old photo if it exists
            if ($data->photo && file_exists(base_path('images/posts/' . $data->photo))) {
                unlink(base_path('images/posts/' . $data->photo));
            }
        }

        $string = $request->tags;
        $unescapedString = stripslashes(trim($string, '"'));
        $tagsArray = explode(",", $unescapedString);
        if (empty($exist_title)) {

            $data->title = $request->title;
            $data->slug = Str::slug($request->title);
            $data->description = $request->description;
            $data->meta_title = $request->meta_title;
            $data->meta_description = $request->meta_description;
            $data->category_id = $request->category_id;
            $data->sub_category_id = $request->sub_category_id;
            $data->sub_sub_category_id = $request->sub_sub_category_id;
            $data->tags = json_encode($tagsArray);
            $data->is_headline = filter_var($request->is_headline, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false;

            $data->photo = $imageName;
            $data->update();
            return response()->json([
                'data' => $request->all(),
                'message' => 'Post updated successfully',
                'code'  => 201
            ]);
        }

    }

    // status change
    public function postStatus($id)
    {
        $data = Post::find($id);
        if ($data->status===1) {
            $data->status = false;
        } else {
            $data->status = true;
        }
        $data->update();
        return response()->json(['code'=>201,'message' => 'Status change successfully']);
    }
    // headline change
    public function postheadlineStatus($id)
    {
        $data = Post::find($id);
        if ($data->is_headline===1) {
            $data->is_headline = false;
        } else {
            $data->is_headline = true;
        }
        $data->update();
        return response()->json(['code'=>201,'message' => 'Headline change successfully']);
    }

    // delete
    public function postDelete($id)
    {
        $data = Post::find($id);
        // Delete old photo if it exists
        if ($data->photo && file_exists(base_path('images/posts/' . $data->photo))) {
            unlink(base_path('images/posts/' . $data->photo));
        }
        $data->delete();
        return response()->json(['code'=>201,'message' => 'Category deleted successfully']);
    }









}
