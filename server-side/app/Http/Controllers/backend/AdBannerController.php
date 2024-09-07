<?php

namespace App\Http\Controllers\backend;

use App\Models\AdBanner;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdBannerController extends Controller
{
    //adbanner get
    function adbannerGet()
    {
        $data = AdBanner::first();
        return response()->json([
            'adbanner' => $data,
            'code'  => 201
        ]);
    }
    // adbanner update
    public function adbannerUpdate(Request $request, $cat)
    {
        $data = AdBanner::first();

        if (!empty($data)) {

            $bannerName =  $request->old_photo;
            if ($request->hasFile($cat)) {
                $banner_image = $request->file($cat);
                $bannerName = time().'.'.$banner_image->getClientOriginalExtension();
                $banner_image->move(base_path('images/adbanner'), $bannerName);

            }
            if ($cat == 'homead1') {
                // Delete if it exists
                if ($data->homead1 && file_exists(base_path('images/adbanner/' . $data->homead1))) {
                    unlink(base_path('images/adbanner/' . $data->homead1));
                }
                $data->homead1 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'homead2') {
                // Delete if it exists
                if ($data->homead2 && file_exists(base_path('images/adbanner/' . $data->homead2))) {
                    unlink(base_path('images/adbanner/' . $data->homead2));
                }
                $data->homead2 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'homead3'){
                // Delete if it exists
                if ($data->homead3 && file_exists(base_path('images/adbanner/' . $data->homead3))) {
                    unlink(base_path('images/adbanner/' . $data->homead3));
                }
                $data->homead3 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'homead4'){
                // Delete if it exists
                if ($data->homead4 && file_exists(base_path('images/adbanner/' . $data->homead4))) {
                    unlink(base_path('images/adbanner/' . $data->homead4));
                }
                $data->homead4 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'rightad1'){
                // Delete if it exists
                if ($data->rightad1 && file_exists(base_path('images/adbanner/' . $data->rightad1))) {
                    unlink(base_path('images/adbanner/' . $data->rightad1));
                }
                $data->rightad1 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'rightad2'){
                // Delete if it exists
                if ($data->rightad2 && file_exists(base_path('images/adbanner/' . $data->rightad2))) {
                    unlink(base_path('images/adbanner/' . $data->rightad2));
                }
                $data->rightad2 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'rightad3'){
                // Delete if it exists
                if ($data->rightad3 && file_exists(base_path('images/adbanner/' . $data->rightad3))) {
                    unlink(base_path('images/adbanner/' . $data->rightad3));
                }
                $data->rightad3 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'rightad4'){
                // Delete if it exists
                if ($data->rightad4 && file_exists(base_path('images/adbanner/' . $data->rightad4))) {
                    unlink(base_path('images/adbanner/' . $data->rightad4));
                }
                $data->rightad4 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else {
                // Delete if it exists
                if ($data->rightad5 && file_exists(base_path('images/adbanner/' . $data->rightad5))) {
                    unlink(base_path('images/adbanner/' . $data->rightad5));
                }
                $data->rightad5 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            }


            $data->update();

            return response()->json([
                'message' => 'Updated successfully',
                'code'  => 201
            ]);
        } else {
            if ($request->hasFile($cat)) {
                $banner_image = $request->file($cat);
                $bannerName = time().'.'.$banner_image->getClientOriginalExtension();
                $banner_image->move(base_path('images/adbanner'), $bannerName);

            } else {
                $bannerName = null;
            }

            $data = new AdBanner();
            if ($cat == 'homead1') {
                $data->homead1 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'homead2') {
                $data->homead2 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'homead3'){
                $data->homead3 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'homead4'){
                $data->homead4 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'rightad1'){
                $data->rightad1 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'rightad2'){
                $data->rightad2 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'rightad3'){
                $data->rightad3 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else if ($cat == 'rightad4'){
                $data->rightad4 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            } else {
                $data->rightad5 = json_encode(['photo' => $bannerName, 'link' => $request->link]);
            }

            $data->save();
            return response()->json([
                'message' => 'Created successfully',
                'code'  => 201
            ]);
        }


    }
}
