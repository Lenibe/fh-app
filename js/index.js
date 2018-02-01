/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function openNav() {
    document.getElementById("mySidenav").style.width = "90%";
    document.getElementById("mySidenav").style.maxWidth = "calc(100% - 120px)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function openNavBG() {
    document.getElementById("mySidenavBG").style.width = "100%";
}

function closeNavBG() {
    document.getElementById("mySidenavBG").style.width = "0";
}