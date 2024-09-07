<?php

namespace App\Http\Controllers\backend;

use App\Models\SiteIdentity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SettingController extends Controller
{
    // identityfatch
    function identityfatch()
    {
        $data = SiteIdentity::first();
        return response()->json([
            'identity' => $data,
            'code'  => 201
        ]);
    }
    // site identity update
    public function identityUpdate(Request $request)
    {
        $data = SiteIdentity::first();

        if (!empty($data)) {

            $logoName = $data->site_logo ?? null;
            if ($request->hasFile('site_logo')) {
                $logo_image = $request->file('site_logo');
                $logoName = time() . '_logo.' . $logo_image->getClientOriginalExtension();
                $logo_image->move(base_path('images/identity'), $logoName);
                // Delete if it exists
                if ($data->site_logo && file_exists(base_path('images/identity/' . $data->site_logo))) {
                    unlink(base_path('images/identity/' . $data->site_logo));
                }
            }

            $iconName = $data->site_icon ?? null;
            if ($request->hasFile('site_icon')) {
                $icon_image = $request->file('site_icon');
                $iconName = time() . '_icon.' . $icon_image->getClientOriginalExtension();
                $icon_image->move(base_path('images/identity'), $iconName);
                // Delete if it exists
                if ($data->site_icon && file_exists(base_path('images/identity/' . $data->site_icon))) {
                    unlink(base_path('images/identity/' . $data->site_icon));
                }
            }

            $data->site_title = $request->site_title;
            $data->tagline = $request->tagline;
            $data->site_logo = $logoName;
            $data->site_icon = $iconName;
            $data->update();

            return response()->json([
                'message' => 'Updated successfully',
                'code' => 201
            ]);
        } else {
            if ($request->hasFile('site_logo')) {
                $image = $request->file('site_logo');
                $logoName = time() . '_logo.' . $image->getClientOriginalExtension();
                $image->move(base_path('images/identity'), $logoName);
            } else {
                $logoName = null;
            }
            if ($request->hasFile('site_icon')) {
                $image = $request->file('site_icon');
                $iconName = time() . '_icon.' . $image->getClientOriginalExtension();
                $image->move(base_path('images/identity'), $iconName);
            } else {
                $iconName = null;
            }

            $data = new SiteIdentity();
            $data->site_title = $request->site_title;
            $data->tagline = $request->tagline;
            $data->site_logo = $logoName;
            $data->site_icon = $iconName;
            $data->save();
            return response()->json([
                'message' => 'Created successfully',
                'code' => 201
            ]);
        }
    }

}
