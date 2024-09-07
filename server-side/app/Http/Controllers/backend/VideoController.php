<?php

namespace App\Http\Controllers\backend;

use App\Models\Video;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VideoController extends Controller
{
    function allVideos() {
        $data = Video::all();
        return response()->json([
            'videos' => $data,
            'code'  => 200
        ]);
    }

    function videoGet($id) {
        $data = Video::find($id);
        return response()->json([
            'video' => $data,
            'code'  => 200
        ]);
    }


    public function store(Request $request)
    {
        $video = Video::create([
            'title' => $request->title,
            'link' => $request->link,
        ]);
        return response()->json([
            'data' => $video,
            'message' => 'Video saved successfully',
            'code'  => 200
        ]);
    }


    public function statusChange($id)
    {
        $data = Video::find($id);
            if ($data->status===1) {
                $data->status = false;
            } else {
                $data->status = true;
            }
            $data->update();
            return response()->json(['code'=>200,'message' => 'Status change successfully']);
    }


    public function videoUpdate(Request $request)
    {
        $data = Video::find($request->id);

        $data->title = $request->title;
        $data->link = $request->link;
        $data->update();
        return response()->json([
            'massage' => "Video updated successfully!",
            'code'  => 200
        ]);
    }


    public function videoDelete($id)
    {
        $data = Video::find($id);
        $data->delete();
        return response()->json(['code'=>200,'message' => 'Video deleted successfully']);
    }
}
