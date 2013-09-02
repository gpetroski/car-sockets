package com.carsockets.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class KeyEvent {
	int player;
	int keyCode;
	boolean keyDown;
	
	public int getKeyCode() {
		return keyCode;
	}
	public void setKeyCode(int keyCode) {
		this.keyCode = keyCode;
	}
	public boolean isKeyDown() {
		return keyDown;
	}
	public void setKeyDown(boolean keyDown) {
		this.keyDown = keyDown;
	}
	public int getPlayer() {
		return player;
	}
	public void setPlayer(int player) {
		this.player = player;
	}
}
