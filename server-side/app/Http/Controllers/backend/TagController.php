<?php

namespace App\Http\Controllers\backend;

use App\Models\Tag;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TagController extends Controller
{
    function allTags() {
        $data = Tag::all();
        return response()->json([
            'tags' => $data,
            'code'  => 200
        ]);
    }

    function tagGet($id) {
        $data = Tag::find($id);
        return response()->json([
            'tag' => $data,
            'code'  => 200
        ]);
    }


    public function store(Request $request)
    {
        $exist_name = Tag::where('name', $request->name)->first();
        if (!empty($exist_name)) {
            return response()->json([
                'message' => 'Tag with the same name already exists',
                'code'  => 422
            ]);
        } else {
            $tag = Tag::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
            ]);
            return response()->json([
                'data' => $tag,
                'message' => 'Tag saved successfully',
                'code'  => 200
            ]);
        }
    }


    public function statusChange($id)
    {
        $data = Tag::find($id);
            if ($data->status===1) {
                $data->status = false;
            } else {
                $data->status = true;
            }
            $data->update();
            return response()->json(['code'=>200,'message' => 'Status change successfully']);
    }


    public function tagUpdate(Request $request)
    {
        $data = Tag::find($request->id);
        if ($request->name != $data->name) {
            $exist_name = Tag::where('name', $request->name)->first();
        } else {
            $exist_name = '';
        }
        if ($exist_name == '') {
            $data->name = $request->name;
            $data->slug = Str::slug($request->name);
            $data->update();
            return response()->json([
                'massage' => "Tag updated successfully!",
                'code'  => 200
            ]);
        } else {
            return response()->json([
                'massage' => "The name already axist !",
                'code'  => 400
            ]);
        }
    }


    public function tagDelete($id)
    {
        $data = Tag::find($id);
        $data->delete();
        return response()->json(['code'=>200,'message' => 'Tag deleted successfully']);
    }
}
