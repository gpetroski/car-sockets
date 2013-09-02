package com.carsockets.controllers;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.atmosphere.annotation.Broadcast;
import org.atmosphere.config.service.Message;
import org.atmosphere.cpr.Broadcaster;
import org.atmosphere.jersey.SuspendResponse;

import com.carsockets.model.KeyEvent;
import com.carsockets.services.EventLogger;

@Path("/carControl/{channel}")
@Produces("application/json")
public class CarControlResource {


    private
    @PathParam("channel")
    Broadcaster channel;

    @GET
    public SuspendResponse<String> subscribe() {
        return new SuspendResponse.SuspendResponseBuilder<String>()
                .broadcaster(channel)
                .outputComments(true)
                .addListener(new EventLogger())
                .build();
    }

    /**
     * Broadcast the received message object to all suspended response. Do not write back the message to the calling connection.
     * @param message a {@link Message}
     * @return a {@link Response}
     */
    @Broadcast(writeEntity = false)
    @POST
    @Produces("application/json")
    @Consumes("application/json")
    public Response broadcast(KeyEvent event) {
        return Response.ok().entity(event).build();
    }
}
