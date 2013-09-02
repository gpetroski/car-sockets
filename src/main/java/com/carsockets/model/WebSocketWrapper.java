package com.carsockets.model;

import org.atmosphere.cpr.Broadcaster;

public class WebSocketWrapper {
	private Broadcaster broadcaster;
	private String channelId;
	
	public WebSocketWrapper(String channelId, Broadcaster broadcaster) {
		this.broadcaster = broadcaster;
		this.channelId = channelId;
	}
	
	public Broadcaster getBroadcaster() {
		return broadcaster;
	}
	public void setBroadcaster(Broadcaster broadcaster) {
		this.broadcaster = broadcaster;
	}
	public String getChannelId() {
		return channelId;
	}
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}
}
