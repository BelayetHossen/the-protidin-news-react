<?php

namespace App\Http\Controllers\backend;

use App\Models\Information;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InfoController extends Controller
{
    // information fatch
    function informationfatch()
    {
        $data = Information::first();
        return response()->json([
            'information' => $data,
            'code'  => 201
        ]);
    }
    // information update
    public function informationUpdate(Request $request)
    {
        $data = Information::first();

        if (!empty($data)) {

            $data->editor = $request->editor;
            $data->advisory_editor = $request->advisory_editor;
            $data->publisher = $request->publisher;
            $data->address = $request->address;
            $data->facebook = $request->facebook;
            $data->instagram = $request->instagram;
            $data->youtube = $request->youtube;
            $data->update();
            return response()->json([
                'message' => 'Updated successfully',
                'code'  => 201
            ]);
        } else {

            $data = new Information();
            $data->editor = $request->editor;
            $data->advisory_editor = $request->advisory_editor;
            $data->publisher = $request->publisher;
            $data->address = $request->address;
            $data->facebook = $request->facebook;
            $data->instagram = $request->instagram;
            $data->youtube = $request->youtube;
            $data->save();
            return response()->json([
                'message' => 'Created successfully',
                'code'  => 201
            ]);
        }


    }
}
