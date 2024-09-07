<?php

namespace App\Http\Controllers\backend;

use App\Models\Page;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PageController extends Controller
{
    // fatch
    function pagePrivacy()
    {
        $data = Page::where('name', 'privacy')->first();
        return response()->json([
            'privacy' => $data,
            'code'  => 201
        ]);
    }
    // fatch
    function pageTerms()
    {
        $data = Page::where('name', 'terms')->first();
        return response()->json([
            'terms' => $data,
            'code'  => 201
        ]);
    }
    // update
    public function privacyUpdate(Request $request)
    {

        $data = Page::where('name', 'privacy')->first();

        if (!empty($data)) {

            $data->content = $request->content;
            $data->update();
            return response()->json([
                'message' => 'Updated successfully',
                'code'  => 201
            ]);
        } else {

            $data = new Page();
            $data->name = "privacy";
            $data->content = $request->content;
            $data->save();
            return response()->json([
                'message' => 'Created successfully',
                'code'  => 201
            ]);
        }


    }
    // update
    public function termsUpdate(Request $request)
    {

        $data = Page::where('name', 'terms')->first();

        if (!empty($data)) {

            $data->content = $request->content;
            $data->update();
            return response()->json([
                'message' => 'Updated successfully',
                'code'  => 201
            ]);
        } else {

            $data = new Page();
            $data->name = "terms";
            $data->content = $request->content;
            $data->save();
            return response()->json([
                'message' => 'Created successfully',
                'code'  => 201
            ]);
        }


    }
}
