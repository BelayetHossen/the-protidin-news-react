<?php

namespace App\Http\Controllers\backend;

use App\Models\Permission;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PermissionController extends Controller
{
    function allPermissions() {
        $data = Permission::all();
        return response()->json([
            'permissions' => $data,
            'code'  => 200
        ]);
    }

    function permissionGet($id) {
        $data = Permission::find($id);
        return response()->json([
            'permission' => $data,
            'code'  => 200
        ]);
    }


    public function store(Request $request)
    {
        $exist_name = Permission::where('name', $request->name)->first();
        if (!empty($exist_name)) {
            return response()->json([
                'message' => 'Permission with the same name already exists',
                'code'  => 422
            ]);
        } else {
            $permission = Permission::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
            ]);
            return response()->json([
                'data' => $permission,
                'message' => 'Permission saved successfully',
                'code'  => 200
            ]);
        }
    }


    public function statusChange($id)
    {
        $data = Permission::find($id);
            if ($data->status===1) {
                $data->status = false;
            } else {
                $data->status = true;
            }
            $data->update();
            return response()->json(['code'=>200,'message' => 'Status change successfully']);
    }


    public function permissionUpdate(Request $request)
    {
        $data = Permission::find($request->id);
        if ($request->name != $data->name) {
            $exist_name = Permission::where('name', $request->name)->first();
        } else {
            $exist_name = '';
        }
        if ($exist_name == '') {
            $data->name = $request->name;
            $data->update();
            return response()->json([
                'massage' => "Permission updated successfully!",
                'code'  => 200
            ]);
        } else {
            return response()->json([
                'massage' => "The name already axist !",
                'code'  => 400
            ]);
        }
    }


    public function permissionDelete($id)
    {
        $data = Permission::find($id);
        $data->delete();
        return response()->json(['code'=>200,'message' => 'Permission deleted successfully']);
    }




}
