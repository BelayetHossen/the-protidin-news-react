<?php

namespace App\Http\Controllers\backend;

use Carbon\Carbon;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MessageController extends Controller
{
    function allMessages() {
        $data = Message::all();
        $unreadCount = Message::where('is_read', false)->count();
        return response()->json([
            'messages' => $data,
            'unreadCount' => $unreadCount,
            'code'  => 200
        ]);
    }

    function messageGet($id) {
        $message = Message::findOrFail($id);
        $message->is_read = true;
        $message->update();
        return response()->json([
            'message' => $message,
            'code'  => 200
        ]);
    }



    public function store(Request $request)
    {
        $availability = Message::where('email', $request->email)
                            ->orderBy('created_at', 'desc')
                            ->first();

        if ($availability && $availability->created_at->gt(Carbon::now()->subHours(2))) {
            $nextAllowedTime = $availability->created_at->addHours(2);
            $remainingTimeInSeconds = Carbon::now()->diffInSeconds($nextAllowedTime);

            // Convert seconds to hours and minutes
            $hours = floor($remainingTimeInSeconds / 3600);
            $minutes = floor(($remainingTimeInSeconds % 3600) / 60);

            return response()->json([
                'data' => $availability,
                'message' => 'পরবর্তী মেসেজ '.$hours.' ঘন্টা '.$minutes.' মিনিট পরে পাঠাতে পারবেন।',
                'code' => 200
            ]);
        } else {
            $Message = Message::create([
                'email' => $request->email,
                'subject' => $request->subject,
                'msg' => $request->msg,
            ]);
            return response()->json([
                'data' => $Message,
                'message' => 'আপনার মেসেজ পাঠানো হয়েছে।',
                'code' => 200
            ]);
        }
    }


    // New method to mark a message as read
    public function markAsRead($id)
    {
        $message = Message::findOrFail($id);
        $message->is_read = true;
        $message->update();

        return response()->json(['code'=>200,'message' => 'Message mark successfully']);
    }


    public function messageDelete($id)
    {
        $data = Message::find($id);
        $data->delete();
        return response()->json(['code'=>200,'message' => 'Message deleted successfully']);
    }
}
